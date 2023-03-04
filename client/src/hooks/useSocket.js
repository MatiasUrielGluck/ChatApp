import { useEffect, useState } from "react";
import { onNewMessage, onSendSeen } from "../socket/socket";

export const useSocket = () => {
  const [newMessage, setNewMessage] = useState(undefined);
  const [msgWhereSeen, setMsgWhereSeen] = useState({});

  useEffect(() => {
    onNewMessage((err, data) => {
      setNewMessage(data.newMessage);
    });
    onSendSeen((err, data) => {
      setMsgWhereSeen({ condition: true, chat: data.chat });
    });
  }, []);

  return {
    newMessage,
    msgWhereSeen,
  };
};
