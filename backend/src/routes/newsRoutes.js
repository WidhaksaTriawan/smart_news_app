const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // ✅ tambahkan ini

// publik
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);

// admin (dengan upload file)
router.post(
  "/",
  adminAuthMiddleware,
  upload.single("image"),
  newsController.createNews
);
router.put(
  "/:id",
  adminAuthMiddleware,
  upload.single("image"),
  newsController.updateNews
);
router.delete("/:id", adminAuthMiddleware, newsController.deleteNews);

module.exports = router;
