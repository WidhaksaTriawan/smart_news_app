const { News, Admin } = require("../models");

// CREATE NEWS
exports.createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const adminId = req.admin?.id; // dari token JWT

    if (!adminId) {
      return res.status(401).json({ message: "Admin tidak terautentikasi" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const news = await News.create({ title, content, imageUrl, adminId });
    res.status(201).json({ message: "Berita berhasil dibuat", news });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL NEWS
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.findAll({
      include: [
        { model: Admin, as: "admin", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE NEWS
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id, {
      include: [
        { model: Admin, as: "admin", attributes: ["id", "name", "email"] },
      ],
    });

    if (!news)
      return res.status(404).json({ message: "Berita tidak ditemukan" });

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE NEWS
exports.updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = await News.findByPk(req.params.id);

    if (!news)
      return res.status(404).json({ message: "Berita tidak ditemukan" });

    let imageUrl = news.imageUrl; // pakai yang lama kalau tidak upload baru
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    await news.update({ title, content, imageUrl });
    res.json({ message: "Berita berhasil diperbarui", news });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE NEWS
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);

    if (!news)
      return res.status(404).json({ message: "Berita tidak ditemukan" });

    await news.destroy();
    res.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
