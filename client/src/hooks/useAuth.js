import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersApi from "../api/usersApi";

export const useAuth = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("checking"); // "checking" | "checked"

  const checkAuth = async () => {
    try {
      await usersApi().get("/verify", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
      setStatus("checked");
      return navigate("/login");
    }
    setStatus("checked");
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { status };
};
