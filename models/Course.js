const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lessons: [{
        type: String
    }] // Simple array for lessons
});

module.exports = mongoose.model('Course', courseSchema);