import { useState } from "react";
import { useSelector } from "react-redux";
import { StyledHomePage } from "./styled-components";

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
  };

  const [chatMessagesList, setChatMessagesList] = useState([]);

  // TEMP DATA!!! TODO: REPLACE THIS DATA WITH REAL DATA FROM DATABASE
  const userList = [
    {
      id: 1,
      username: "Matias",
    },
    {
      id: 2,
      username: "Debora",
    },
    {
      id: 3,
      username: "Mario",
    },
  ];

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
      recieverId: 2,
      msg: "Hola debi",
      date: new Date(),
    },
    {
      id: 2,
      chatId: 1,
      senderId: 1,
      recieverId: 2,
      msg: "cómo estás?",
      date: new Date(),
    },
    {
      id: 3,
      chatId: 2,
      senderId: 3,
      recieverId: 1,
      msg: "Hola mati",
      date: new Date(),
    },
    {
      id: 4,
      chatId: 1,
      senderId: 2,
      recieverId: 1,
      msg: "Hola mati, todo bien! Vos cómo estás?",
      date: new Date(),
    },
    {
      id: 5,
      chatId: 1,
      senderId: 1,
      recieverId: 2,
      msg: "Me alegro, todo bien por suerteeeeeeeeeeeeee!",
      date: new Date(),
    },
    {
      id: 6,
      chatId: 2,
      senderId: 1,
      recieverId: 3,
      msg: "Hola Mario!",
      date: new Date(),
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
    let mm = date.getMonth() + 1; // Months start at 0!
    return `${dd}/${mm}`;
  };

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
                    selectedChat.id === chat.id ? "active-chat" : ""
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
          </>
        )}
      </div>
    </StyledHomePage>
  );
};
