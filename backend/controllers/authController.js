const jwt = require('jsonwebtoken');
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

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, college, graduationYear } = req.body;
    
    // req.user is set by auth middleware
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    if (name) student.name = name;
    if (college) student.college = college;
    if (graduationYear) student.graduationYear = graduationYear;

    await student.save();

    const studentResponse = student.toObject();
    delete studentResponse.password;

    res.json({
      message: 'Profile updated successfully',
      user: studentResponse
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile.' });
  }
};

module.exports = {
  studentRegister,
  studentLogin,
  updateProfile
};