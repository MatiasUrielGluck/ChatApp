const { onSendMsg } = require("./controllers/Socket");

const socket = (io) => {
  io.on("connection", (client) => {
    client.on("send-msg", async (data) => {
      await onSendMsg(io, client, data);
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
};

module.exports = socket;
