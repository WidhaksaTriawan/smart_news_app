const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthMiddleware = (req, res, next) => {
  try {
    // ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token tidak disediakan" });
    }

    const token = authHeader.split(" ")[1];

    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // pastikan token milik admin
    if (decoded.type !== "admin") {
      return res.status(403).json({ message: "Akses ditolak (bukan admin)" });
    }

    // simpan data admin ke req.user agar bisa digunakan di controller berikutnya
    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Token tidak valid atau sudah kedaluwarsa" });
  }
};

module.exports = adminAuthMiddleware;
