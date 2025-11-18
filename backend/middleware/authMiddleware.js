const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Ambil token dari Header
  const token = req.header('Authorization');

  // 2. Cek apakah token ada
  if (!token) return res.status(401).json({ message: "Akses ditolak! Tidak ada token." });

  try {
    // 3. Verifikasi token (Kupas tokennya)
    // Biasanya format token: "Bearer <token_asli>"
    const tokenClean = token.replace("Bearer ", ""); 
    const verified = jwt.verify(tokenClean, process.env.JWT_SECRET);
    
    // 4. Simpan data user ke request supaya bisa dipakai di controller
    req.user = verified;
    next(); // Lanjut ke proses berikutnya
  } catch (err) {
    res.status(400).json({ message: "Token tidak valid!" });
  }
};