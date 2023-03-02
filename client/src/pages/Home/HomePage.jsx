import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledHomePage } from "./styled-components";
import "../../socket/socket";
import { sendMsg } from "../../socket/socket";
import usersApi from "../../api/usersApi";

export const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [searchInput, setSearchInput] = useState("");
  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onUserSearch = (e) => {
    e.preventDefault();
    console.log(searchInput);
  };

  const [selectedChat, setSelectedChat] = useState(null);
  const onSelectChat = (chat) => {
    setSelectedChat(chat);
    getMessagesByChatId(chat.id);
    setSendMsgInput("");
    if (document.getElementById("sendMsgInput")) {
      document.getElementById("sendMsgInput").focus();
    }
  };

  const [chatMessagesList, setChatMessagesList] = useState([]);

  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    const result = await usersApi().get("/", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    setUserList(result.data.userList);
  };

  // REAL DATA
  useEffect(() => {
    getUserList();
  }, []);

  // TEMP DATA!!! TODO: REPLACE THIS DATA WITH REAL DATA FROM DATABASE

  const chatList = [
    {
      id: 1,
      user1Id: 2,
      user2Id: 1,
    },
    {
      id: 2,
      user1Id: 1,
      user2Id: 3,
    },
  ];

  const messageList = [
    {
      id: 1,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Hola debi",
      date: new Date(),
      seen: true,
    },
    {
      id: 2,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "cómo estás?",
      date: new Date(),
      seen: true,
    },
    {
      id: 3,
      chatId: 2,
      senderId: 3,
      receiverId: 1,
      msg: "Hola mati",
      date: new Date(),
      seen: true,
    },
    {
      id: 4,
      chatId: 1,
      senderId: 2,
      receiverId: 1,
      msg: "Hola mati, todo bien! Vos cómo estás?",
      date: new Date(),
      seen: true,
    },
    {
      id: 5,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: true,
    },
    {
      id: 6,
      chatId: 2,
      senderId: 1,
      receiverId: 3,
      msg: "Hola Mario!",
      date: new Date(),
      seen: true,
    },
    {
      id: 7,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: true,
    },
    {
      id: 8,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: true,
    },
    {
      id: 9,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: true,
    },
    {
      id: 10,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: true,
    },
    {
      id: 11,
      chatId: 1,
      senderId: 1,
      receiverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee! Estoy entusiasmado por mejorar esta app y seguir aprendiendo! Este es un mensaje largo para comprobar los estilos de cada mensaje jaja!",
      date: new Date(),
      seen: false,
    },
  ];
  ///////////////////////////////////////////////////////////////////////

  const getUserById = (id) => {
    return userList.filter((user) => user.id === id)[0];
  };

  const getMessagesByChatId = (chatId) => {
    // TODO: This should be a backend request, not a frontend process!!!
    const list = [];
    for (const message of messageList) {
      if (message.chatId === chatId) {
        list.push(message);
      }
    }
    setChatMessagesList(list);
  };

  const getLastMessageByChatId = (chatId) => {
    let lastMessage;
    for (const message of messageList) {
      if (message.chatId === chatId) {
        lastMessage = message;
      }
    }
    return lastMessage;
  };

  const transformDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    return `${dd}/${mm}`;
  };

  const getCompleteDate = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();
    let hh = String(date.getHours()).padStart(2, "0");
    let min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const [sendMsgInput, setSendMsgInput] = useState("");
  const onSendMsgInputChange = (e) => {
    setSendMsgInput(e.target.value);
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [chatMessagesList]);

  const onSendMsgEvent = (e) => {
    e.preventDefault();
    const newMessageList = [];
    for (const msg of chatMessagesList) {
      newMessageList.push(msg);
    }

    const newMessage = {
      id: messageList.length,
      chatId: selectedChat.id,
      senderId: user.id,
      receiverId:
        selectedChat.user1Id === user.id
          ? selectedChat.user2Id
          : selectedChat.user1Id,
      msg: sendMsgInput,
      date: new Date(),
      seen: false,
    };

    newMessageList.push(newMessage);
    messageList.push(newMessage);

    setChatMessagesList(newMessageList);
    setSendMsgInput("");
    sendMsg(newMessage);
  };

  const scrollToBottom = (activateEffect = false) => {
    const element = document.getElementById("bottom");
    if (element) {
      element.scrollIntoView({ behavior: activateEffect ? "smooth" : "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  if (!userList.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <StyledHomePage>
      <div className="left-container">
        <h2>Chat</h2>
        <div className="search-bar">
          {/* TODO: Search bar to search other users and chat with them */}
          <form onSubmit={onUserSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={onSearchInputChange}
            />
          </form>
        </div>
        <div className="chat-list">
          {/* TODO: List of chats the user has interacted with */}
          {chatList.map((chat) => {
            if (chat.user1Id === user.id || chat.user2Id === user.id) {
              return (
                <div
                  className={`chat-item ${
                    selectedChat
                      ? selectedChat.id === chat.id
                        ? "active-chat"
                        : ""
                      : ""
                  }`}
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="top-row">
                    <p className="chat-item__username">
                      {chat.user1Id === user.id
                        ? getUserById(chat.user2Id).username
                        : getUserById(chat.user1Id).username}
                    </p>
                    <p className="chat-item__date">
                      {transformDate(getLastMessageByChatId(chat.id).date)}
                    </p>
                  </div>
                  <p className="chat-item__last-msg">
                    {getLastMessageByChatId(chat.id).msg}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="right-container">
        {/* TODO: Chat, with history msgs and at the bottom the textbox to send a new message. */}
        {!selectedChat ? (
          <></>
        ) : (
          <>
            <h1>
              {selectedChat.user1Id === user.id
                ? getUserById(selectedChat.user2Id).username
                : getUserById(selectedChat.user1Id).username}
            </h1>
            {/* TODO: CHAT! */}
            <div className="chat">
              {chatMessagesList.map((message) => (
                <div
                  key={message.id}
                  className={`msg-container ${
                    message.senderId === user.id ? "sent" : "received"
                  }`}
                >
                  <div className="date-row">
                    <p>{getCompleteDate(message.date)}</p>
                    {message.senderId === user.id ? (
                      message.seen ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-regular fa-circle-check"></i>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="msg-row">{message.msg}</div>
                </div>
              ))}
              <div className="div" id="bottom"></div>
            </div>

            <div className="send-msg-input">
              <form onSubmit={onSendMsgEvent}>
                <input
                  id="sendMsgInput"
                  type="text"
                  placeholder="Message"
                  value={sendMsgInput}
                  onChange={onSendMsgInputChange}
                />
              </form>
            </div>
          </>
        )}
      </div>
    </StyledHomePage>
  );
};
