const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Student Register
const studentRegister = async (req, res) => {
  try {
    const { email, password, phone, marketingOptIn } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists.' });
    }

    const student = new Student({
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : undefined,
      marketingOptIn: marketingOptIn === true || marketingOptIn === 'true'
    });

    await student.save();

    const studentResponse = student.toObject();
    delete studentResponse.password;
    
    const token = generateToken(student._id);

    res.status(201).json({
      message: 'Account created successfully',
      user: studentResponse,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to create account.' });
  }
};

// Student Login
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const student = await Student.findOne({ email: email.toLowerCase() }).select('+password');

    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await student.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(student._id);

    const studentResponse = student.toObject();
    delete studentResponse.password;

    res.json({
      message: 'Login successful',
      user: studentResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Failed to get user data.' });
  }
};

// Get all employees (admin only)
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ isTeamMember: true })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ employees });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Failed to get employees.' });
  }
};

// Get all users (for assigning tasks)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isTeamMember: true })
      .select('-password')
      .sort({ name: 1 });

    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Failed to get users.' });
  }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user.' });
  }
};

// Update current user profile
const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    
    // Only update allowed fields
    if (profilePicture !== undefined) {
      req.user.profilePicture = profilePicture;
    }
    
    await req.user.save();
    
    res.json({
      message: 'Profile updated successfully',
      user: req.user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile.' });
  }
};

// Delete user (admin only)
const deleteEmployee = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete an admin.' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Failed to delete employee.' });
  }
};

module.exports = {
  studentRegister,
  studentLogin
};