// models/Preference.js
const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    study: { type: String },
    examStatus: { type: String },
    program: { type: String },
    city: { type: String },
    fieldOfStudy: { type: String },
    grade: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
