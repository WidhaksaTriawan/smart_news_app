const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminAuthController");

router.post("/register", controller.registerAdmin);
router.post("/login", controller.loginAdmin);

module.exports = router;
