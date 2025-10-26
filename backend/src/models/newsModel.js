const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true, // karena ON DELETE SET NULL
      references: {
        model: "admins", // nama tabel lowercase
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "news", // pastikan lowercase juga
  }
);

module.exports = News;
