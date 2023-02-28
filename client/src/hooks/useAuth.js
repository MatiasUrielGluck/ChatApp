import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import usersApi from "../api/usersApi";
import { completeLogin } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
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

    const payload = {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
    };
    dispatch(completeLogin(payload));
    setStatus("checked");
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { status };
};
