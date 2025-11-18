const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Load config
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Koneksi ke Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Route Test
app.get('/', (req, res) => {
  res.send('API Campus Lost & Found Ready!');
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});