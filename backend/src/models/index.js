const sequelize = require("../config/databaseConfig");
const Admin = require("./adminModel");
const News = require("./newsModel");

Admin.hasMany(News, { foreignKey: "adminId", as: "news" });
News.belongsTo(Admin, { foreignKey: "adminId", as: "admin" });

const syncDb = async () => {
  await sequelize.sync({ alter: true });
  console.log("✅ Database synced successfully!");
};

module.exports = { sequelize, Admin, News, syncDb };
