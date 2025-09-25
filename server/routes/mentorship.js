const express = require('express');
const Mentorship = require('../models/Mentorship');
const User = require('../models/User');
const { protect, isMentor } = require('../middleware/auth');

const router = express.Router();

// @desc    Create mentorship request
// @route   POST /api/mentorship/request
// @access  Private (students)
router.post('/request', protect, async (req, res) => {
  try {
    const { mentorId, mentorshipArea, description, goals, duration } = req.body;

    // Validation
    if (!mentorId || !mentorshipArea || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide mentor ID, mentorship area, and description'
      });
    }

    // Check if mentor exists and is available
    const mentor = await User.findById(mentorId);
    if (!mentor || !mentor.isMentor || !mentor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found or unavailable'
      });
    }

    // Check if user already has an active mentorship with this mentor
    const existingMentorship = await Mentorship.findOne({
      mentor: mentorId,
      mentee: req.user.id,
      status: { $in: ['pending', 'active'] }
    });

    if (existingMentorship) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active or pending mentorship with this mentor'
      });
    }

    // Check mentor's current mentee count
    const activeMentorships = await Mentorship.countDocuments({
      mentor: mentorId,
      status: 'active'
    });

    if (activeMentorships >= mentor.maxMentees) {
      return res.status(400).json({
        success: false,
        message: 'This mentor has reached their maximum mentee capacity'
      });
    }

    // Create mentorship request
    const mentorship = await Mentorship.create({
      mentor: mentorId,
      mentee: req.user.id,
      mentorshipArea,
      description,
      goals: goals || [],
      duration: duration || 3
    });

    // Populate mentor and mentee details
    await mentorship.populate([
      { path: 'mentor', select: 'firstName lastName email currentPosition currentCompany' },
      { path: 'mentee', select: 'firstName lastName email graduationYear degree' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Mentorship request created successfully',
      data: mentorship
    });

  } catch (error) {
    console.error('Create mentorship request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating mentorship request',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get user's mentorships (as mentor or mentee)
// @route   GET /api/mentorship/my-mentorships
// @access  Private
router.get('/my-mentorships', protect, async (req, res) => {
  try {
    const { status, role } = req.query;

    let query = {};
    
    if (role === 'mentor') {
      query.mentor = req.user.id;
    } else if (role === 'mentee') {
      query.mentee = req.user.id;
    } else {
      // Get both mentor and mentee relationships
      query.$or = [
        { mentor: req.user.id },
        { mentee: req.user.id }
      ];
    }

    if (status) {
      query.status = status;
    }

    const mentorships = await Mentorship.find(query)
      .populate('mentor', 'firstName lastName email currentPosition currentCompany profileImage')
      .populate('mentee', 'firstName lastName email graduationYear degree profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentorships.length,
      data: mentorships
    });

  } catch (error) {
    console.error('Get my mentorships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentorships',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Update mentorship status (accept/reject/complete)
// @route   PUT /api/mentorship/:id/status
// @access  Private (mentor for accept/reject, both for complete)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const mentorshipId = req.params.id;

    if (!['active', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be active, cancelled, or completed'
      });
    }

    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    // Authorization checks
    const isMentor = mentorship.mentor.toString() === req.user.id;
    const isMentee = mentorship.mentee.toString() === req.user.id;

    if (!isMentor && !isMentee) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Status-specific authorization
    if (status === 'active' && !isMentor) {
      return res.status(403).json({
        success: false,
        message: 'Only mentors can accept mentorship requests'
      });
    }

    if (status === 'cancelled' && mentorship.status === 'active' && !isMentor) {
      return res.status(403).json({
        success: false,
        message: 'Only mentors can cancel active mentorships'
      });
    }

    // Update status
    mentorship.status = status;

    if (status === 'active') {
      mentorship.startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + mentorship.duration);
      mentorship.endDate = endDate;
    }

    await mentorship.save();

    await mentorship.populate([
      { path: 'mentor', select: 'firstName lastName email currentPosition currentCompany' },
      { path: 'mentee', select: 'firstName lastName email graduationYear degree' }
    ]);

    res.status(200).json({
      success: true,
      message: `Mentorship ${status} successfully`,
      data: mentorship
    });

  } catch (error) {
    console.error('Update mentorship status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating mentorship status',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Add meeting to mentorship
// @route   POST /api/mentorship/:id/meetings
// @access  Private (mentor or mentee)
router.post('/:id/meetings', protect, async (req, res) => {
  try {
    const { date, duration, notes } = req.body;
    const mentorshipId = req.params.id;

    if (!date || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide meeting date and duration'
      });
    }

    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    // Check if user is part of this mentorship
    const isMentor = mentorship.mentor.toString() === req.user.id;
    const isMentee = mentorship.mentee.toString() === req.user.id;

    if (!isMentor && !isMentee) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Add meeting
    mentorship.meetings.push({
      date: new Date(date),
      duration: parseInt(duration),
      notes: notes || ''
    });

    await mentorship.save();

    res.status(200).json({
      success: true,
      message: 'Meeting added successfully',
      data: mentorship.meetings[mentorship.meetings.length - 1]
    });

  } catch (error) {
    console.error('Add meeting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding meeting',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Add feedback to mentorship
// @route   POST /api/mentorship/:id/feedback
// @access  Private (mentor or mentee)
router.post('/:id/feedback', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const mentorshipId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid rating (1-5)'
      });
    }

    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    // Check if user is part of this mentorship
    const isMentor = mentorship.mentor.toString() === req.user.id;
    const isMentee = mentorship.mentee.toString() === req.user.id;

    if (!isMentor && !isMentee) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Add feedback based on role
    if (isMentor) {
      mentorship.feedback.mentorFeedback = {
        rating: parseInt(rating),
        comment: comment || ''
      };
    } else {
      mentorship.feedback.menteeFeedback = {
        rating: parseInt(rating),
        comment: comment || ''
      };
    }

    await mentorship.save();

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: mentorship.feedback
    });

  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get mentorship statistics
// @route   GET /api/mentorship/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = {};

    if (req.user.isMentor) {
      // Mentor stats
      const totalMentorships = await Mentorship.countDocuments({
        mentor: req.user.id
      });

      const activeMentorships = await Mentorship.countDocuments({
        mentor: req.user.id,
        status: 'active'
      });

      const completedMentorships = await Mentorship.countDocuments({
        mentor: req.user.id,
        status: 'completed'
      });

      const pendingRequests = await Mentorship.countDocuments({
        mentor: req.user.id,
        status: 'pending'
      });

      stats.mentor = {
        totalMentorships,
        activeMentorships,
        completedMentorships,
        pendingRequests,
        availableSlots: req.user.maxMentees - activeMentorships
      };
    }

    // Mentee stats
    const totalAsMentee = await Mentorship.countDocuments({
      mentee: req.user.id
    });

    const activeAsMentee = await Mentorship.countDocuments({
      mentee: req.user.id,
      status: 'active'
    });

    const completedAsMentee = await Mentorship.countDocuments({
      mentee: req.user.id,
      status: 'completed'
    });

    stats.mentee = {
      totalMentorships: totalAsMentee,
      activeMentorships: activeAsMentee,
      completedMentorships: completedAsMentee
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get mentorship stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mentorship statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;