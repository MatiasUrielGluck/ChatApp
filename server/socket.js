const { onSendMsg } = require("./controllers/Socket");

const socket = (io) => {
  io.on("connection", (client) => {
    client.on("send-msg", async (data, callback) => {
      const resultObj = await onSendMsg(client, data);
      if (resultObj.result === "error") return;
      callback(resultObj.newMessage);
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
};

module.exports = socket;
