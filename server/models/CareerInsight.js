const mongoose = require('mongoose');

const careerInsightSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'career-advice',
      'industry-trends',
      'skill-development',
      'job-search',
      'networking',
      'entrepreneurship',
      'work-life-balance',
      'interviews',
      'salary-negotiation',
      'professional-growth'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  industry: {
    type: String,
    trim: true
  },
  targetAudience: {
    type: String,
    enum: ['students', 'recent-graduates', 'experienced-professionals', 'career-changers', 'all'],
    default: 'all'
  },
  readTime: {
    type: Number, // in minutes
    default: function() {
      // Estimate reading time based on content length (average 200 words per minute)
      const wordCount = this.content.split(' ').length;
      return Math.ceil(wordCount / 200);
    }
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    likes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likedAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
careerInsightSchema.index({ author: 1 });
careerInsightSchema.index({ category: 1 });
careerInsightSchema.index({ tags: 1 });
careerInsightSchema.index({ industry: 1 });
careerInsightSchema.index({ publishedAt: -1 });
careerInsightSchema.index({ featured: 1, publishedAt: -1 });
careerInsightSchema.index({ 'likes.user': 1 });

// Text search index
careerInsightSchema.index({ 
  title: 'text', 
  content: 'text', 
  tags: 'text' 
});

// Virtual for like count
careerInsightSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
careerInsightSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Method to increment views
careerInsightSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to check if user liked the post
careerInsightSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

module.exports = mongoose.model('CareerInsight', careerInsightSchema);