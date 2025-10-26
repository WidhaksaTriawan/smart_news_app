const multer = require("multer");
const path = require("path");

// Tentukan lokasi penyimpanan dan nama file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // simpan di folder "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // contoh: 1735648123-123456789.png
  },
});

// Filter file (hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error(
      "Hanya file gambar (jpg, jpeg, png) yang diperbolehkan"
    );
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

// Batasi ukuran maksimal (5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
