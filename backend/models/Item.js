const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Nama barang wajib diisi
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true // Lokasi ditemukan wajib diisi
  },
  imageUrl: {
    type: String, // Kita simpan nama filenya saja nanti
    required: true
  },
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ini menghubungkan barang dengan User yang memposting
    required: true
  },
  status: {
    type: String,
    enum: ['Lost', 'Claimed'], // Status cuma boleh 'Lost' atau 'Claimed'
    default: 'Lost'
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);