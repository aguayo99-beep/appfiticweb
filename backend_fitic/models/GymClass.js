const mongoose = require('mongoose');

const gymClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  instructor: {
    type: String,
    required: true
  },
  maxParticipants: { 
    type: Number,
    required: true
  },
  reservationDate: {
    type: Date,
    required: true,
  }
});

const GymClass = mongoose.model('GymClass', gymClassSchema);

module.exports = GymClass;
