// routes/admin.js
const express = require('express');
const { getAllUsers, deleteUser, generateReports } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
//middlewares
router.get('/users', protect, authorize('admin'), getAllUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.get('/reports', protect, authorize('admin'), generateReports);

//controllers
router.get('/users',protect, getAllUsers);
router.delete('/users/:id', protect, deleteUser);
router.get('/reports', protect, generateReports );


