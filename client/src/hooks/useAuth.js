import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersApi from "../api/usersApi";

export const useAuth = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("checking");

  const checkAuth = async () => {
    // if auth not valid (send token to backend) or not setted (no token at localstorage), navigate to /login and set status to checked
    
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { status };
};
