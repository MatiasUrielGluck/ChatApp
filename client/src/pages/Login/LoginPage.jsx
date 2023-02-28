import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import usersApi from "../../api/usersApi";
import { completeLogin } from "../../store/authSlice";
import { StyledAuthPage } from "../../styled-components";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const [checkStatus, setCheckStatus] = useState(false);
  const [error, setError] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setCheckStatus(true);

    try {
      const body = {
        username: usernameInput,
        password: passwordInput,
      };
      const resp = await usersApi().post("/login", body);
      const payload = resp.data;
      dispatch(completeLogin(payload));
      return navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setCheckStatus(false);
  };

  return (
    <StyledAuthPage>
      <h1>Login</h1>
      <form onSubmit={onFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={usernameInput}
            onChange={onUsernameChange}
          />
          <p className={`unclickable ${usernameInput ? "filled" : ""}`}>
            Username
          </p>
        </div>

        <div className="input-container">
          <input
            type="password"
            value={passwordInput}
            onChange={onPasswordChange}
          />
          <p className={`unclickable ${passwordInput ? "filled" : ""}`}>
            Password
          </p>
        </div>

        {error ? (
          <div className="input-container">
            <span>Username or password are incorrect</span>
          </div>
        ) : (
          <></>
        )}

        <div className="input-container">
          {checkStatus ? (
            <button type="submit" className="unclickable disabled" disabled>
              Login
            </button>
          ) : (
            <button type="submit" className="unclickable">
              Login
            </button>
          )}
        </div>

        <div className="input-container">
          <NavLink to="/register">
            Don't have a user? Register by clicking here
          </NavLink>
        </div>
      </form>
    </StyledAuthPage>
  );
};
