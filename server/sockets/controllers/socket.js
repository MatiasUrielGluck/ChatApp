const { checkJWT } = require("../../helpers/jwt");
const Message = require("../../models/Message");

const onSendMsg = async (io, client, data, connectedUsers) => {
  const { token, message } = data;

  // START OF SECURITY CHECKS
  if (!token) {
    client.disconnect();
    return {
      result: "error",
    };
  }

  try {
    const tokenResult = checkJWT(token);
    if (tokenResult.status === "error") {
      client.disconnect();
      return {
        result: "error",
      };
    }

    if (tokenResult.data.id !== message.senderId)
      return {
        result: "error",
      };
    // END OF SECURITY CHECKS
    //

    // Save the message to the database
    const saveResult = await Message.create({
      chatId: message.chatId,
      senderId: message.senderId,
      receiverId: message.receiverId,
      msg: message.msg,
      date: message.date,
      status: "sent", // default value is sent
    });

    client.emit("send-msg", saveResult.dataValues);
    const receiverSocket = connectedUsers.getUserByDatabaseId(
      message.receiverId
    ).socketId;

    io.to(receiverSocket).emit("new-msg", {
      newMessage: saveResult.dataValues,
    });

    return {
      result: "ok",
      newMessage: saveResult.dataValues,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

const onConnectUser = async (io, client, data, connectedUsers) => {
  const { token } = data;

  if (!token) {
    return;
  }

  const result = checkJWT(token);

  if (result.status === "error") {
    return;
  }

  const decodedToken = result.data;
  const userId = decodedToken.id;
  connectedUsers.connectUser({ databaseId: userId, socketId: client.id });
};

const onSendSeen = async (io, client, data, connectedUsers) => {
  const { token, chat } = data;

  if (!token) {
    return;
  }

  const result = checkJWT(token);

  if (result.status === "error") {
    return;
  }

  const decodedToken = result.data;
  const userId = decodedToken.id;

  try {
    const messageList = await Message.findAll({
      where: {
        chatId: chat.id,
        receiverId: userId,
      },
    });

    for (const msg of messageList) {
      if (msg.status !== "seen") {
        msg.status = "seen";
        await msg.save();
      }
    }

    const senderSocket = connectedUsers.getUserByDatabaseId(
      chat.user1Id === userId ? chat.user1Id : chat.user2Id
    ).socketId;

    const receiverSocket = connectedUsers.getUserByDatabaseId(
      chat.user1Id === userId ? chat.user2Id : chat.user1Id
    ).socketId;

    io.to(senderSocket).emit("send-seen", {
      msg: "ok",
      chat,
    });

    io.to(receiverSocket).emit("send-seen", {
      msg: "ok",
      chat,
    });

    return {
      msg: "ok",
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  onSendMsg,
  onConnectUser,
  onSendSeen,
};
