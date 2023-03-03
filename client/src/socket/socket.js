import io from "socket.io-client";
import { asyncEmit } from "./asyncEmit";

const socket = io(import.meta.env.VITE_BACKEND_URL);

socket.on("connect", () => {});

socket.on("disconnect", () => {});

export const sendMsg = async (message) => {
  const payload = {
    token: localStorage.getItem("token"),
    message,
  };

  const result = await asyncEmit(socket, "send-msg", payload);
  
  return result;
};
