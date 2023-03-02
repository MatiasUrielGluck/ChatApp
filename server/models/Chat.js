const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const Chat = sequelize.define(
  "Chat",
  {
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Chat;
