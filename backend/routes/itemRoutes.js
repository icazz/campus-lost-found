const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// --- SETUP MULTER (Upload Gambar) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Simpan di folder 'uploads'
  },
  filename: (req, file, cb) => {
    // Namai file dengan: waktu_sekarang + nama_asli (biar gak bentrok)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// --- DEFINISI ROUTES ---

// 1. Ambil Semua Barang (Bisa diakses siapa saja/Public)
router.get('/', itemController.getItems);

// 2. Post Barang (Harus Login + Ada Gambar)
// authMiddleware = Cek Login dulu
// upload.single('image') = Proses upload file dari field bernama 'image'
router.post('/', authMiddleware, upload.single('image'), itemController.createItem);

// 3. Hapus Barang (Harus Login)
router.delete('/:id', authMiddleware, itemController.deleteItem);

module.exports = router;