const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Username tidak boleh sama
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Otomatis buat kolom created_at dan updated_at

module.exports = mongoose.model('User', userSchema);