// routes/recruiter.js
const express = require('express');
const { createJob,viewApplications,updateApplicationStatus } = require('../controllers/recruiterController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//middlewares
router.post('/jobs', protect, authorize('recruiter'), createJob);
router.get('/jobs/:id/application', protect, authorize('recruiter'), viewApplications);
router.put('/jobs/:jobId/applications/:studentId', protect, authorize('recruiter'), updateApplicationStatus);

//controllers
router.post('/jobs', protect, createJob);
router.get('/jobs/:id/applications', protect, viewApplications);
router.put('/jobs/:jobId/applications/:studentId', protect, updateApplicationStatus);

