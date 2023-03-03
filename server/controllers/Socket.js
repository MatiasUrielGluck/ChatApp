const { checkJWT } = require("../helpers/jwt");
const Message = require("../models/Message");

const onSendMsg = async (client, data) => {
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

    return {
      result: "ok",
      newMessage: saveResult.dataValues,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  onSendMsg,
};
