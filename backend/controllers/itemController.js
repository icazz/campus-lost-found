const Item = require('../models/Item');

// CREATE: Tambah Barang Baru (Wajib Login & Upload Gambar)
exports.createItem = async (req, res) => {
  try {
    // Cek apakah ada gambar diupload
    if (!req.file) {
      return res.status(400).json({ message: "Wajib upload gambar barang!" });
    }

    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      imageUrl: req.file.filename, // Kita simpan nama filenya saja
      founder: req.user.id // ID user diambil dari middleware (si Satpam tadi)
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ: Ambil Semua Barang
exports.getItems = async (req, res) => {
  try {
    // .populate('founder', 'name') artinya: 
    // "Tolong ambilkan juga nama si penemu dari tabel User"
    const items = await Item.find().populate('founder', 'name username').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Hapus Barang (Hanya pemilik yang boleh hapus)
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Barang tidak ditemukan" });

    // Cek apakah yang request hapus adalah si pembuat postingan
    if (item.founder.toString() !== req.user.id) {
      return res.status(403).json({ message: "Kamu tidak berhak menghapus postingan ini!" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Barang berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};