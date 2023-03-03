const { onSendMsg, onConnectUser } = require("./controllers/socket");

const socket = (io, connectedUsers) => {
  io.on("connection", (client) => {
    client.on("send-msg", async (data) => {
      await onSendMsg(io, client, data, connectedUsers);
    });

    client.on("connect-user", async (data) => {
      await onConnectUser(io, client, data, connectedUsers);
    });

    client.on("disconnect", () => {
      connectedUsers.disconnectUserBySocketId(client.id);
    });
  });
};

module.exports = socket;
