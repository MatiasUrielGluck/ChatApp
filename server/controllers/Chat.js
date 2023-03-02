const { request, response } = require("express");
const internalMsg = require("../helpers/internalMsg");
const User = require("../models/User");
const Chat = require("../models/Chat");

const createChat = async (req = request, res = response) => {
  const { user1Id, user2Id } = req.body;

  if (
    req.decodedToken.data.id !== user1Id &&
    req.decodedToken.data.id !== user2Id
  ) {
    return res.status(403).json({
      msg: "Access denied.",
    });
  }

  try {
    // Verify that the chat does not exist, user1Id = user1Id and user1Id = user2Id (both directions)

    const firstDirection = await Chat.findAll({
      where: {
        user1Id: user1Id,
        user2Id: user2Id,
      },
    });

    const secondDirection = await Chat.findAll({
      where: {
        user1Id: user2Id,
        user2Id: user1Id,
      },
    });

    if (firstDirection.length || secondDirection.length) {
      return res.status(400).json({
        msg: "The chat already exists.",
      });
    }

    await Chat.create({
      user1Id,
      user2Id,
    });

    return res.status(201).json({
      msg: "Chat created.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: internalMsg.internalError,
    });
  }
};

module.exports = {
  createChat,
};
