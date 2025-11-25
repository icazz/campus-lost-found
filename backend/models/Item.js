const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true 
  },
  imageUrl: {
    type: String, 
    required: true
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Lost', 'Claimed'],
    default: 'Lost'
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);