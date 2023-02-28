import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import usersApi from "../../api/usersApi";
import { completeLogin } from "../../store/authSlice";
import { StyledAuthPage } from "../../styled-components";

export const RegisterPage = () => {
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
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!usernameInput || !passwordInput) {
      setErrorMsg("Username and password must be completed");
      setError(true);
      return;
    }

    setErrorMsg("");
    setError(false);

    setCheckStatus(true);

    try {
      const body = {
        username: usernameInput,
        password: passwordInput,
      };
      await usersApi().post("/", body);
      return navigate("/login");
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setCheckStatus(false);
  };

  return (
    <StyledAuthPage>
      <h1>Register</h1>
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
            <span>{errorMsg}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="input-container">
          {checkStatus ? (
            <button type="submit" className="unclickable disabled" disabled>
              Register
            </button>
          ) : (
            <button type="submit" className="unclickable">
              Register
            </button>
          )}
        </div>

        <div className="input-container">
          <NavLink to="/login">
            Already have a user? Login by clicking here
          </NavLink>
        </div>
      </form>
    </StyledAuthPage>
  );
};
