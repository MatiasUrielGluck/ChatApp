const { onSendMsg } = require("./controllers/Socket");

const socket = (io) => {
  io.on("connection", (client) => {
    client.on("send-msg", async (data) => {
      await onSendMsg(client, data);
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
};

module.exports = socket;
