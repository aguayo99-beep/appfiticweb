const mongoose = require('mongoose');

const gymClassReservationSchema = new mongoose.Schema({

   
  userId: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },

  instructorName: {
    type: String,
    required: true,
  },
  gymClassName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  gymClassDate: {
    type: Date,
    required: true,
  }


  
  
});



const GymClassReservation = mongoose.model('GymClassReservation', gymClassReservationSchema);

module.exports = GymClassReservation;
