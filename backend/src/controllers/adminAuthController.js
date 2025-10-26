const bcrypt = require("bcryptjs");
const { Admin } = require("../models");
const generateToken = require("../utils/generateToken");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });

    const token = generateToken({ id: admin.id, type: "admin" });
    res.status(201).json({ admin, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      return res.status(404).json({ message: "Admin tidak ditemukan" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = generateToken({ id: admin.id, type: "admin" });
    res.json({ admin, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
