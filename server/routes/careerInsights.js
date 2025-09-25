const express = require('express');
const CareerInsight = require('../models/CareerInsight');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all career insights with filtering and pagination
// @route   GET /api/career-insights
// @access  Public (enhanced with auth)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      industry,
      targetAudience,
      search,
      featured,
      authorId,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { status: 'published' };

    if (category) {
      query.category = category;
    }

    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    if (targetAudience) {
      query.targetAudience = { $in: [targetAudience, 'all'] };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (authorId) {
      query.author = authorId;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const insights = await CareerInsight.find(query)
      .populate('author', 'firstName lastName currentPosition currentCompany profileImage')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(startIndex);

    // Get total count
    const total = await CareerInsight.countDocuments(query);

    res.status(200).json({
      success: true,
      count: insights.length,
      total,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: insights
    });

  } catch (error) {
    console.error('Get career insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching career insights',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get single career insight
// @route   GET /api/career-insights/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const insight = await CareerInsight.findById(req.params.id)
      .populate('author', 'firstName lastName currentPosition currentCompany profileImage bio')
      .populate('comments.author', 'firstName lastName profileImage');

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    if (insight.status !== 'published') {
      // Only author can view unpublished insights
      if (!req.user || req.user.id !== insight.author._id.toString()) {
        return res.status(404).json({
          success: false,
          message: 'Career insight not found'
        });
      }
    }

    // Increment views (but not for the author)
    if (!req.user || req.user.id !== insight.author._id.toString()) {
      await insight.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: insight
    });

  } catch (error) {
    console.error('Get career insight error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching career insight',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Create new career insight
// @route   POST /api/career-insights
// @access  Private (alumni only)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.userType !== 'alumni' && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only alumni can create career insights'
      });
    }

    const {
      title,
      content,
      category,
      tags,
      industry,
      targetAudience,
      status = 'published'
    } = req.body;

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, content, and category'
      });
    }

    const insight = await CareerInsight.create({
      title,
      content,
      category,
      tags: tags || [],
      industry,
      targetAudience: targetAudience || 'all',
      author: req.user.id,
      status
    });

    await insight.populate('author', 'firstName lastName currentPosition currentCompany profileImage');

    res.status(201).json({
      success: true,
      message: 'Career insight created successfully',
      data: insight
    });

  } catch (error) {
    console.error('Create career insight error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating career insight',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Update career insight
// @route   PUT /api/career-insights/:id
// @access  Private (author only)
router.put('/:id', protect, async (req, res) => {
  try {
    const insight = await CareerInsight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    // Check ownership
    if (insight.author.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedInsight = await CareerInsight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName currentPosition currentCompany profileImage');

    res.status(200).json({
      success: true,
      message: 'Career insight updated successfully',
      data: updatedInsight
    });

  } catch (error) {
    console.error('Update career insight error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating career insight',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Delete career insight
// @route   DELETE /api/career-insights/:id
// @access  Private (author only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const insight = await CareerInsight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    // Check ownership
    if (insight.author.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await CareerInsight.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Career insight deleted successfully'
    });

  } catch (error) {
    console.error('Delete career insight error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting career insight',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Like/unlike career insight
// @route   POST /api/career-insights/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const insight = await CareerInsight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    const alreadyLiked = insight.isLikedBy(req.user.id);

    if (alreadyLiked) {
      // Remove like
      insight.likes = insight.likes.filter(
        like => like.user.toString() !== req.user.id
      );
    } else {
      // Add like
      insight.likes.push({ user: req.user.id });
    }

    await insight.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Like removed' : 'Insight liked',
      data: {
        liked: !alreadyLiked,
        likeCount: insight.likes.length
      }
    });

  } catch (error) {
    console.error('Like career insight error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing like',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Add comment to career insight
// @route   POST /api/career-insights/:id/comments
// @access  Private
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    const insight = await CareerInsight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    insight.comments.push({
      author: req.user.id,
      content
    });

    await insight.save();
    
    await insight.populate('comments.author', 'firstName lastName profileImage');

    const newComment = insight.comments[insight.comments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: newComment
    });

  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding comment',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get career insight categories and stats
// @route   GET /api/career-insights/stats/overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalInsights = await CareerInsight.countDocuments({ status: 'published' });

    // Category distribution
    const categoryStats = await CareerInsight.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Popular tags
    const tagStats = await CareerInsight.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    // Recent insights
    const recentInsights = await CareerInsight.find({ status: 'published' })
      .populate('author', 'firstName lastName currentPosition currentCompany')
      .sort({ publishedAt: -1 })
      .limit(5)
      .select('title category publishedAt views likeCount');

    res.status(200).json({
      success: true,
      data: {
        totalInsights,
        categoryDistribution: categoryStats,
        popularTags: tagStats,
        recentInsights
      }
    });

  } catch (error) {
    console.error('Get career insights stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;