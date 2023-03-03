require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
  },
});
const socket = require("./socket");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const sequelize = require("./services/database");

const usersRouter = require("./routes/User");
const chatsRouter = require("./routes/Chat");
const messagesRouter = require("./routes/Message");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = {
  users: "/api/users",
  chats: "/api/chats",
  messages: "/api/messages",
};

app.use(apiRoutes.users, usersRouter);
app.use(apiRoutes.chats, chatsRouter);
app.use(apiRoutes.messages, messagesRouter);
////////////////////////////////////////////

socket(io);

server.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  try {
    await sequelize.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
