// routes/student.js
const express = require('express');
const { updateProfile, viewJobs, applyJob } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


//middlewares
router.put('/profile', protect, authorize('student'), createJob);
router.get('/jobs', protect, authorize('student'), viewApplications);
router.post('/jobs/:jobId/apply', protect, authorize('student'), updateApplicationStatus);

//controllers

router.put('/profile', protect, updateProfile);
router.get('/jobs', protect, viewJobs);
router.post('/jobs/:id/apply', protect, applyJob);



