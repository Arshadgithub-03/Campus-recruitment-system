// controllers/studentController.js
const User = require('../models/User');
const Job = require('../models/Job');

// Update student profile
const updateProfile = async (req, res) => {
  const { skills, achievements, resumeUrl } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    user.skills = skills || user.skills;
    user.achievements = achievements || user.achievements;
    user.resumeUrl = resumeUrl || user.resumeUrl;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// View available jobs
const viewJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiterId', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply for a job
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.studentId.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    job.applicants.push({ studentId: req.user.id });
    await job.save();
    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateProfile,
  viewJobs,
  applyJob,
};
