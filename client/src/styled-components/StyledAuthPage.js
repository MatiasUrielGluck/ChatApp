import styled from "styled-components";

export const StyledAuthPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ecf0f1;

  form {
    margin-top: 24px;
    width: 100%;

    .input-container {
      max-width: 250px;
      position: relative;
      display: grid;
      place-items: center;
      margin: 36px auto;

      input {
        margin: auto;
        width: 100%;
        padding: 7px;
        border: 1px solid gray;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        &:focus ~ p {
          transform: translateY(-28px) translateX(-8px) scale(90%);
        }
      }

      p {
        position: absolute;
        left: 7px;
        pointer-events: none;
        transition: all 0.3s ease;

        &.filled {
          transform: translateY(-28px) translateX(-8px) scale(90%);
        }
      }

      button {
        padding: 12px 24px;
        border: none;
        background: #2c5dfd;
        color: white;
        font-size: 16px;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        transition: all 0.3s ease;

        &:hover {
          border-radius: 0px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }

        &:active {
          transform: scale(90%);
        }

        &.disabled {
          opacity: 60%;

          &:hover {
            border-radius: 12px;
            box-shadow: initial;
          }

          &:active {
            transform: initial;
          }
        }
      }

      span {
        color: #ff000f;
        text-align: center;
      }

      a {
        color: #2c5dfd;
        text-align: center;
      }
    }
  }
`;
