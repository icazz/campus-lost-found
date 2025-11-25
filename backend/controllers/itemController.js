const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Wajib upload gambar barang!" });
    }

    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      imageUrl: req.file.filename,
      founder: req.user.id
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('founder', 'name username').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Barang tidak ditemukan" });

    if (item.founder.toString() !== req.user.id) {
      return res.status(403).json({ message: "Kamu tidak berhak menghapus postingan ini!" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Barang berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};