import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledHomePage } from "./styled-components";
import "../../socket/socket";
import { connectUser, sendMsg, sendSeen } from "../../socket/socket";
import usersApi from "../../api/usersApi";
import chatsApi from "../../api/chatsApi";
import messagesApi from "../../api/messagesApi";
import { useSocket } from "../../hooks/useSocket";

export const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const { newMessage, msgWhereSeen } = useSocket();

  useEffect(() => {
    connectUser();
  }, []);

  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [filteredSelectedUser, FilteredSelectedUser] = useState(null);

  const [chatList, setChatList] = useState([]);
  const [chatMessagesList, setChatMessagesList] = useState([]);

  const [messageList, setMessageList] = useState([]);

  const addMessageFromServer = async () => {
    if (!newMessage) {
      return;
    }

    if (
      !chatList.filter((chat) => {
        return chat.id === newMessage.chatId;
      }).length
    ) {
      await getChatList();
    }

    const newMessageList = [];
    for (const msg of messageList) {
      newMessageList.push(msg);
    }
    newMessageList.push(newMessage);
    setMessageList(newMessageList);

    if (newMessage.chatId !== selectedChat.id) {
      return;
    }

    const newChatMessageList = [];
    for (const msg of chatMessagesList) {
      newChatMessageList.push(msg);
    }
    newChatMessageList.push(newMessage);
    setChatMessagesList(newChatMessageList);

    await sendSeen(selectedChat);
    await getMessageList();
  };

  useEffect(() => {
    addMessageFromServer();
  }, [newMessage]);

  const updateMessageLists = () => {
    if (!msgWhereSeen.chat) {
      return;
    }

    // console.log(msgWhereSeen);
    const newGlobalList = [];
    for (const msg of messageList) {
      if (msg.chatId === msgWhereSeen.chat.id) {
        if (msg.senderId === user.id) {
          msg.status = "seen";
        }
      }
      newGlobalList.push(msg);
    }
    setMessageList(newGlobalList);

    if (!selectedChat) {
      return;
    }

    const newSelectedChatMessageList = [];
    for (const msg of chatMessagesList) {
      if (msg.chatId === msgWhereSeen.chat.id) {
        if (msg.senderId === user.id) {
          msg.status = "seen";
        }
      }
      newSelectedChatMessageList.push(msg);
    }

    setChatMessagesList(newSelectedChatMessageList);
  };

  useEffect(() => {
    updateMessageLists();
  }, [msgWhereSeen]);

  const getUserList = async () => {
    const result = await usersApi().get("/", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    setUserList(result.data.userList);
  };

  const getChatList = async () => {
    const result = await chatsApi().get("/", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    setChatList(result.data.chatList);
  };

  const getMessageList = async () => {
    const result = await messagesApi().get("/", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });

    setMessageList(result.data.messageList);
  };

  useEffect(() => {
    getUserList();
    getMessageList();
    getChatList();
  }, []);

  const compareChatFnByDate = (chatA, chatB) => {
    if (
      !getLastMessageByChatId(chatA.id) ||
      !getLastMessageByChatId(chatB.id)
    ) {
      console.log("Ando mal...");
      return;
    }

    if (
      new Date(getLastMessageByChatId(chatA.id).date).getTime() >
      new Date(getLastMessageByChatId(chatB.id).date).getTime()
    ) {
      return -1;
    } else {
      return 1;
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const initFilteredUserList = () => {
    setFilteredUserList(
      userList.filter((local_user) => {
        return local_user.id !== user.id;
      })
    );
  };

  useEffect(() => {
    if (userList.length) {
      setFilteredUserList(
        userList.filter((user) => {
          return user.username.toLowerCase().includes(searchInput);
        })
      );
    }
  }, [searchInput]);

  const selectFilteredUser = (clickedUser) => {
    // RF021: Si no existe el chat correspondiente al usuario seleccionado con el usuario logueado, el sistema debe crear un chat temporal
    let chatToBeSelected;
    const chatToBeSelectedListed = chatList.filter((chat) => {
      if (
        (chat.user1Id === user.id || chat.user2Id === user.id) &&
        (chat.user1Id === clickedUser.id || chat.user2Id === clickedUser.id)
      ) {
        return chat;
      }
    });

    if (!chatToBeSelectedListed.length) {
      chatToBeSelected = {
        id: 912304789514243151785134235163453461728098198379825646536451928374610610598,
        user1Id: user.id,
        user2Id: clickedUser.id,
      };
    } else {
      chatToBeSelected = chatToBeSelectedListed[0];
      return onSelectChat(chatToBeSelected);
    }

    let newChatList = [chatToBeSelected];
    for (const chat of chatList) {
      if (
        chat.id ===
        912304789514243151785134235163453461728098198379825646536451928374610610598
      ) {
        continue;
      }
      newChatList.push(chat);
    }

    setChatList(newChatList);

    setSelectedChat(chatToBeSelected);
    getMessagesByChatId(chatToBeSelected.id);
    setSendMsgInput("");
    if (document.getElementById("sendMsgInput")) {
      document.getElementById("sendMsgInput").focus();
    }

    setFilteredUserList([]);
  };

  const onUserSearch = (e) => {
    e.preventDefault();
    console.log(searchInput);
  };

  const closeFilter = async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    setFilteredUserList([]);
  };

  const [selectedChat, setSelectedChat] = useState(null);

  const onSelectChat = async (chat) => {
    setChatList(
      chatList.filter(
        (chat) =>
          chat.id !==
          912304789514243151785134235163453461728098198379825646536451928374610610598
      )
    );

    setSelectedChat(chat);
    getMessagesByChatId(chat.id);
    setSendMsgInput("");
    if (document.getElementById("sendMsgInput")) {
      document.getElementById("sendMsgInput").focus();
    }

    await sendSeen(chat);
    await getMessageList();
  };

  const getUserById = (id) => {
    return userList.filter((user) => user.id === id)[0];
  };

  const getMessagesByChatId = (chatId) => {
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
    date = new Date(date);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    return `${dd}/${mm}`;
  };

  const getCompleteDate = (date) => {
    date = new Date(date);
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

  const onSendMsgEvent = async (e) => {
    e.preventDefault();

    if (
      selectedChat.id ===
      912304789514243151785134235163453461728098198379825646536451928374610610598
    ) {
      // This chat is temporal and empty, save it to the database
      const body = {
        user1Id: selectedChat.user1Id,
        user2Id: selectedChat.user2Id,
      };
      const result = await chatsApi().post("/", body, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });

      const chatId = result.data.chatId;
      let newChatList = [];
      for (const chat of chatList) {
        if (
          chat.id ===
          912304789514243151785134235163453461728098198379825646536451928374610610598
        ) {
          chat.id = chatId;
        }

        newChatList.push(chat);
      }
      setChatList(newChatList);
    }

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
      status: "none",
    };

    const newMessageServerSide = await sendMsg(newMessage);

    newMessageList.push(newMessageServerSide);

    setChatMessagesList(newMessageList);

    const newGlobalMessageList = [];
    for (const msg of messageList) {
      newGlobalMessageList.push(msg);
    }
    newGlobalMessageList.push(newMessageServerSide);
    setMessageList(newGlobalMessageList);

    setSendMsgInput("");
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
          <form onSubmit={onUserSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={onSearchInputChange}
              onClick={initFilteredUserList}
              onBlur={closeFilter}
            />
          </form>
          <div className="filtered-users-container">
            {filteredUserList.map((user) => (
              <div
                className="filtered-user"
                key={user.id}
                onClick={() => {
                  selectFilteredUser(user);
                }}
              >
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-list">
          {chatList
            .sort((chatA, chatB) => compareChatFnByDate(chatA, chatB))
            .map((chat) => {
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
                        {getLastMessageByChatId(chat.id)
                          ? transformDate(getLastMessageByChatId(chat.id).date)
                          : "--/--"}
                      </p>
                    </div>
                    <p className="chat-item__last-msg">
                      {getLastMessageByChatId(chat.id) ? (
                        <span
                          className={`${
                            getLastMessageByChatId(chat.id).senderId === user.id
                              ? ""
                              : getLastMessageByChatId(chat.id).status !==
                                "seen"
                              ? "notification"
                              : ""
                          }`}
                        >
                          {getLastMessageByChatId(chat.id).msg}
                        </span>
                      ) : (
                        "-"
                      )}
                    </p>
                  </div>
                );
              }
            })}
        </div>
      </div>

      <div className="right-container">
        {!selectedChat ? (
          <></>
        ) : (
          <>
            <h1>
              {selectedChat.user1Id === user.id
                ? getUserById(selectedChat.user2Id).username
                : getUserById(selectedChat.user1Id).username}
            </h1>
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
                      message.status === "seen" ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : message.status === "sent" ? (
                        <i className="fa-regular fa-circle-check"></i>
                      ) : message.status === "none" ? (
                        <i className="fa-solid fa-paper-plane"></i>
                      ) : (
                        <></>
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
