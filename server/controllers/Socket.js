const { checkJWT } = require("../helpers/jwt");

const onSendMsg = (client, data) => {
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

    console.log(tokenResult, data);
    return {
      result: "ok",
      message,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  onSendMsg,
};
