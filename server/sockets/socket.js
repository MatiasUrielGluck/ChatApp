const {
  onSendMsg,
  onConnectUser,
  onSendSeen,
} = require("./controllers/socket");

const socket = (io, connectedUsers) => {
  io.on("connection", (client) => {
    client.on("send-msg", async (data) => {
      await onSendMsg(io, client, data, connectedUsers);
    });

    client.on("send-seen", async (data) => {
      console.log("Emited send seen from client");
      await onSendSeen(io, client, data, connectedUsers);
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
