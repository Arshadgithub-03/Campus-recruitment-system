// controllers/adminController.js
const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate reports
const generateReports = async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ role: 'student' });
    const recruitersCount = await User.countDocuments({ role: 'recruiter' });
    const jobsCount = await Job.countDocuments();

    res.status(200).json({
      students: studentsCount,
      recruiters: recruitersCount,
      jobs: jobsCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  generateReports,
};
