import { useEffect, useState } from "react";
import { onNewMessage } from "../socket/socket";

export const useSocket = () => {
  const [newMessage, setNewMessage] = useState(undefined);

  useEffect(() => {
    onNewMessage((err, data) => {
      setNewMessage(data.newMessage);
    });
  }, []);

  return {
    newMessage,
  };
};
