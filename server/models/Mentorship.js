const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  mentorshipArea: {
    type: String,
    required: [true, 'Mentorship area is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  goals: [{
    type: String,
    trim: true
  }],
  duration: {
    type: Number, // in months
    min: [1, 'Duration must be at least 1 month'],
    max: [12, 'Duration cannot exceed 12 months'],
    default: 3
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  meetings: [{
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: {
    mentorFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'Feedback comment cannot exceed 500 characters']
      }
    },
    menteeFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'Feedback comment cannot exceed 500 characters']
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
mentorshipSchema.index({ mentor: 1, status: 1 });
mentorshipSchema.index({ mentee: 1, status: 1 });
mentorshipSchema.index({ status: 1 });
mentorshipSchema.index({ startDate: 1 });

// Pre-save middleware to set end date
mentorshipSchema.pre('save', function(next) {
  if (this.isNew && !this.endDate) {
    const endDate = new Date(this.startDate);
    endDate.setMonth(endDate.getMonth() + this.duration);
    this.endDate = endDate;
  }
  next();
});

module.exports = mongoose.model('Mentorship', mentorshipSchema);