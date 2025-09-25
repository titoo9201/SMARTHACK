const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Profile Information
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  phone: {
    type: String,
    validate: {
      validator: function(phone) {
        return /^\+?[\d\s\-\(\)]{10,}$/.test(phone);
      },
      message: 'Please enter a valid phone number'
    }
  },
  
  // Academic Information
  graduationYear: {
    type: Number,
    min: [1950, 'Graduation year must be after 1950'],
    max: [new Date().getFullYear() + 10, 'Graduation year cannot be too far in the future']
  },
  degree: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  college: {
    type: String,
    trim: true
  },
  
  // Professional Information
  currentPosition: {
    type: String,
    trim: true
  },
  currentCompany: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative']
  },
  skills: [{
    type: String,
    trim: true
  }],
  linkedinUrl: {
    type: String,
    validate: {
      validator: function(url) {
        return !url || /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
      },
      message: 'Please enter a valid LinkedIn URL'
    }
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function(url) {
        return !url || /^https?:\/\/(www\.)?github\.com\//.test(url);
      },
      message: 'Please enter a valid GitHub URL'
    }
  },
  
  // Location
  location: {
    city: String,
    state: String,
    country: String
  },
  
  // User Type and Status
  userType: {
    type: String,
    enum: ['student', 'alumni', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Mentorship
  isMentor: {
    type: Boolean,
    default: false
  },
  mentorshipAreas: [{
    type: String,
    trim: true
  }],
  maxMentees: {
    type: Number,
    default: 3,
    min: [1, 'Maximum mentees must be at least 1'],
    max: [10, 'Maximum mentees cannot exceed 10']
  },
  
  // Privacy Settings
  profileVisibility: {
    type: String,
    enum: ['public', 'alumni-only', 'private'],
    default: 'alumni-only'
  },
  showEmail: {
    type: Boolean,
    default: false
  },
  showPhone: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
}, {
  timestamps: true
});

// Index for search optimization
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });
userSchema.index({ graduationYear: 1 });
userSchema.index({ industry: 1 });
userSchema.index({ location: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name virtual
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Transform JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);