const express = require('express');
const User = require('../models/User');
const Mentorship = require('../models/Mentorship');
const CareerInsight = require('../models/CareerInsight');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply admin authorization to all routes
router.use(protect);
router.use(authorize('admin'));

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (admin only)
router.get('/dashboard', async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments();
    const totalAlumni = await User.countDocuments({ userType: 'alumni' });
    const totalStudents = await User.countDocuments({ userType: 'student' });
    const totalMentors = await User.countDocuments({ isMentor: true });
    const activeUsers = await User.countDocuments({ isActive: true });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) }
    });

    // Mentorship statistics
    const totalMentorships = await Mentorship.countDocuments();
    const activeMentorships = await Mentorship.countDocuments({ status: 'active' });
    const completedMentorships = await Mentorship.countDocuments({ status: 'completed' });
    const pendingMentorships = await Mentorship.countDocuments({ status: 'pending' });

    // Career insights statistics
    const totalInsights = await CareerInsight.countDocuments();
    const publishedInsights = await CareerInsight.countDocuments({ status: 'published' });
    const draftInsights = await CareerInsight.countDocuments({ status: 'draft' });

    // Recent activities
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('firstName lastName email userType createdAt');

    const recentMentorships = await Mentorship.find()
      .populate('mentor', 'firstName lastName')
      .populate('mentee', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        userStats: {
          total: totalUsers,
          alumni: totalAlumni,
          students: totalStudents,
          mentors: totalMentors,
          active: activeUsers,
          newThisMonth: newUsersThisMonth
        },
        mentorshipStats: {
          total: totalMentorships,
          active: activeMentorships,
          completed: completedMentorships,
          pending: pendingMentorships
        },
        insightStats: {
          total: totalInsights,
          published: publishedInsights,
          drafts: draftInsights
        },
        recentActivities: {
          users: recentUsers,
          mentorships: recentMentorships
        }
      }
    });

  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get all users with filtering and pagination
// @route   GET /api/admin/users
// @access  Private (admin only)
router.get('/users', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      userType,
      isActive,
      isVerified,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = {};

    if (userType) {
      query.userType = userType;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Update user status (activate/deactivate/verify)
// @route   PUT /api/admin/users/:id/status
// @access  Private (admin only)
router.put('/users/:id/status', async (req, res) => {
  try {
    const { isActive, isVerified } = req.body;
    const userId = req.params.id;

    const updateFields = {};
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (isVerified !== undefined) updateFields.isVerified = isVerified;

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -resetPasswordExpire');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get all mentorships with filtering
// @route   GET /api/admin/mentorships
// @access  Private (admin only)
router.get('/mentorships', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      mentorshipArea,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = {};

    if (status) {
      query.status = status;
    }

    if (mentorshipArea) {
      query.mentorshipArea = { $regex: mentorshipArea, $options: 'i' };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const mentorships = await Mentorship.find(query)
      .populate('mentor', 'firstName lastName email currentPosition currentCompany')
      .populate('mentee', 'firstName lastName email graduationYear degree')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(startIndex);

    const total = await Mentorship.countDocuments(query);

    res.status(200).json({
      success: true,
      count: mentorships.length,
      total,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: mentorships
    });

  } catch (error) {
    console.error('Get mentorships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentorships',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get all career insights for moderation
// @route   GET /api/admin/career-insights
// @access  Private (admin only)
router.get('/career-insights', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = {};

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const insights = await CareerInsight.find(query)
      .populate('author', 'firstName lastName email currentPosition currentCompany')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(startIndex);

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

// @desc    Update career insight status or feature it
// @route   PUT /api/admin/career-insights/:id
// @access  Private (admin only)
router.put('/career-insights/:id', async (req, res) => {
  try {
    const { status, featured } = req.body;
    const insightId = req.params.id;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (featured !== undefined) updateFields.featured = featured;

    const insight = await CareerInsight.findByIdAndUpdate(
      insightId,
      updateFields,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: 'Career insight not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Career insight updated successfully',
      data: insight
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

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting other admins
    if (user.userType === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;