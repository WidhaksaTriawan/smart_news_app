const express = require("express");
const cors = require("cors");
const { syncDb } = require("./models");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const newsRoutes = require("./routes/newsRoutes"); // <--- tambahkan

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/news", newsRoutes); // <--- tambahkan ini
app.use("/uploads", express.static("uploads"));

syncDb();

module.exports = app;
