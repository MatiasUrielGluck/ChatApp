import axios from "axios";

const chatsApi = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_CHATS,
  });
};

export default chatsApi;
