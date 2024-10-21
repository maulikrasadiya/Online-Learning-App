const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Admin: Create a new course
module.exports.createCourse = async (req, res) => {
  const { title, description, lessons } = req.body;

  try {
    const course = new Course({ title, description, lessons });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err.message);
    res.status(500).json({ error: 'Server error during course creation' });
  }
};

// User: Enroll in a course
module.exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const enrollment = new Enrollment({ user: req.user.id, course: courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    console.error('Error enrolling in course:', err.message);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
};

// User: Track progress in a course
module.exports.trackProgress = async (req, res) => {
  const { courseId, progress } = req.body;

  try {
    const enrollment = await Enrollment.findOne({ user: req.user.id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    enrollment.progress = progress;
    await enrollment.save();
    res.status(200).json(enrollment);
  } catch (err) {
    console.error('Error tracking progress:', err.message);
    res.status(500).json({ error: 'Server error during progress tracking' });
  }
};
