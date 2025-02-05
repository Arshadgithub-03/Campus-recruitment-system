// controllers/recruiterController.js
const Job = require('../models/Job');

// Create a job posting
const createJob = async (req, res) => {
  const { title, description, requirements } = req.body;

  try {
    const job = new Job({
      title,
      description,
      requirements,
      recruiterId: req.user.id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// View applications for a job
const viewApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      'applicants.studentId',
      'name email skills resumeUrl'
    );

    if (!job || job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(job.applicants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Shortlist or reject an applicant
const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const job = await Job.findById(req.params.jobId);

    if (!job || job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applicant = job.applicants.find(
      (app) => app.studentId.toString() === req.params.studentId
    );

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    applicant.status = status;
    await job.save();

    res.status(200).json({ message: `Application status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createJob,
  viewApplications,
  updateApplicationStatus,
};
