const express = require('express');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all alumni with filtering and pagination
// @route   GET /api/alumni
// @access  Public (with optional auth for enhanced results)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      graduationYear,
      industry,
      location,
      skills,
      sortBy = 'firstName',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    let query = { 
      userType: { $in: ['alumni', 'student'] },
      isActive: true
    };

    // Apply visibility filters based on authentication
    if (!req.user) {
      query.profileVisibility = 'public';
    } else if (req.user.userType === 'student') {
      query.profileVisibility = { $in: ['public', 'alumni-only'] };
    }

    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { currentCompany: { $regex: search, $options: 'i' } },
        { currentPosition: { $regex: search, $options: 'i' } }
      ];
    }

    // Filters
    if (graduationYear) {
      query.graduationYear = graduationYear;
    }

    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } },
        { 'location.country': { $regex: location, $options: 'i' } }
      ];
    }

    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const alumni = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .sort(sortOptions)
      .limit(limitNum)
      .skip(startIndex);

    // Get total count for pagination
    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: alumni.length,
      total,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: alumni
    });

  } catch (error) {
    console.error('Get alumni error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching alumni',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get alumni by ID
// @route   GET /api/alumni/:id
// @access  Public (with visibility restrictions)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const alumni = await User.findById(req.params.id)
      .select('-password -resetPasswordToken -resetPasswordExpire');

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    // Check visibility permissions
    if (alumni.profileVisibility === 'private') {
      if (!req.user || req.user.id !== alumni.id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'This profile is private'
        });
      }
    } else if (alumni.profileVisibility === 'alumni-only') {
      if (!req.user || req.user.userType === 'student') {
        // Remove sensitive information for students
        const publicAlumni = { ...alumni.toObject() };
        if (!alumni.showEmail) delete publicAlumni.email;
        if (!alumni.showPhone) delete publicAlumni.phone;
        return res.status(200).json({
          success: true,
          data: publicAlumni
        });
      }
    }

    res.status(200).json({
      success: true,
      data: alumni
    });

  } catch (error) {
    console.error('Get alumni by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching alumni',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get alumni statistics
// @route   GET /api/alumni/stats/overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalAlumni = await User.countDocuments({ 
      userType: 'alumni', 
      isActive: true 
    });

    const totalStudents = await User.countDocuments({ 
      userType: 'student', 
      isActive: true 
    });

    const totalMentors = await User.countDocuments({ 
      isMentor: true, 
      isActive: true 
    });

    // Top industries
    const industryStats = await User.aggregate([
      { $match: { userType: 'alumni', isActive: true, industry: { $exists: true, $ne: '' } } },
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Graduation year distribution
    const graduationStats = await User.aggregate([
      { $match: { graduationYear: { $exists: true, $ne: null } } },
      { $group: { _id: '$graduationYear', count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 10 }
    ]);

    // Location distribution
    const locationStats = await User.aggregate([
      { $match: { 'location.country': { $exists: true, $ne: '' } } },
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalAlumni,
        totalStudents,
        totalMentors,
        industryDistribution: industryStats,
        graduationYearDistribution: graduationStats,
        locationDistribution: locationStats
      }
    });

  } catch (error) {
    console.error('Get alumni stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get mentors list
// @route   GET /api/alumni/mentors
// @access  Private (students and alumni)
router.get('/mentors/available', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      mentorshipArea,
      industry,
      experience
    } = req.query;

    // Build query for available mentors
    let query = {
      isMentor: true,
      isActive: true,
      userType: 'alumni'
    };

    if (mentorshipArea) {
      query.mentorshipAreas = { $in: [mentorshipArea] };
    }

    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    if (experience) {
      query.experience = { $gte: parseInt(experience) };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    const mentors = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .sort({ experience: -1, firstName: 1 })
      .limit(limitNum)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: mentors.length,
      total,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      },
      data: mentors
    });

  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentors',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;