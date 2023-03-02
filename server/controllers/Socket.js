const { checkJWT } = require("../helpers/jwt");

const onSendMsg = (client, data) => {
  const { token } = data;

  if (!token) {
    // TODO:return error
    client.disconnect();
    return;
  }

  try {
    const tokenResult = checkJWT(token);
    if (tokenResult.status === "error") {
      // TODO:return error
      client.disconnect();
      return;
    }

    // TODO: check that the user id of the decoded token equals the sender id of the data
    console.log(tokenResult, data);
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  onSendMsg,
};
