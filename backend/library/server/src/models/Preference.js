const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  theme: {
    type: String,
    default: 'light',
  },
  language: {
    type: String,
    default: 'en',
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Preference', preferenceSchema);
