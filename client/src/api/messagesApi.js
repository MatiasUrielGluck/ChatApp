import axios from "axios";

const messagesApi = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_MESSAGES,
  });
};

export default messagesApi;
