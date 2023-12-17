const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  isAdmin: { type: Boolean, default: false } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
