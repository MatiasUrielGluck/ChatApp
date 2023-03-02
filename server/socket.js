const { onSendMsg } = require("./controllers/Socket");

const socket = (io) => {
  io.on("connection", (client) => {
    client.on("send-msg", (data, callback) => {
      const resultObj = onSendMsg(client, data);
      if (resultObj.result === "error") return;
      callback();
    });
    client.on("disconnect", () => {
      /* … */
    });
  });
};

module.exports = socket;
