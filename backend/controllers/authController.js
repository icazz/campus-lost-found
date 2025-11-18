const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER (Daftar User Baru)
exports.register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // 1. Cek apakah username sudah dipakai
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username sudah dipakai!" });

    // 2. Acak password (Hash)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke Database
    const newUser = new User({
      username,
      password: hashedPassword,
      name
    });
    await newUser.save();

    res.status(201).json({ message: "Berhasil mendaftar! Silakan login." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN (Masuk & Dapat Token)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });

    // 2. Cek password cocok atau tidak
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah!" });

    // 3. Buat Token (Tiket Masuk)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};