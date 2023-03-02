import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

socket.on("connect", () => {
  console.log("Conected");
});

socket.on("disconnect", () => {
  console.log("Disonected");
});

export const sendMsg = (message) => {
  const payload = {
    token: localStorage.getItem("token"),
    message,
  };
  socket.emit("send-msg", payload, (newMessage) => {
    console.log(newMessage);
  });
};
