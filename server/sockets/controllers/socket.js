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

module.exports = {
  onSendMsg,
  onConnectUser,
};
