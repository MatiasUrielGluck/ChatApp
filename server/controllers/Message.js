const { request, response } = require("express");
const { Op } = require("sequelize");
const Message = require("../models/Message");

const getMessageListForUser = async (req = request, res = response) => {
  try {
    const messageList = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: req.decodedToken.data.id },
          { receiverId: req.decodedToken.data.id },
        ],
      },
    });

    res.status(200).json({
      msg: "OK",
      messageList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: internalMsg.internalError,
    });
  }
};

module.exports = {
  getMessageListForUser,
};
