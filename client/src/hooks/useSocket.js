import { useEffect, useState } from "react";
import { onNewMessage, onSendSeen } from "../socket/socket";

export const useSocket = () => {
  const [newMessage, setNewMessage] = useState(undefined);

  useEffect(() => {
    onNewMessage((err, data) => {
      setNewMessage(data.newMessage);
    });
    onSendSeen((err, data) => {
      console.log(data.message);
    });
  }, []);

  return {
    newMessage,
  };
};
