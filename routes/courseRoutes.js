const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/create', authMiddleware, courseController.createCourse);  // Admin-only in practice
router.post('/enroll', authMiddleware, courseController.enrollCourse);
router.post('/track', authMiddleware, courseController.trackProgress);

module.exports = router;
