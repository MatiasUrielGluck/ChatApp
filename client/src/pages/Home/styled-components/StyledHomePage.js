import styled from "styled-components";

export const StyledHomePage = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;

  .left-container {
    max-width: 300px;
    min-width: 300px;
    width: 100%;
    background: #bdc3c7;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h2 {
      margin-bottom: 12px;
      padding: 12px;
    }

    input {
      margin-bottom: 12px;
      padding: 8px;
      margin: 12px;
      width: calc(100% - 24px);
      border: 1px solid gray;
      border-radius: 3px;
      background: #d2d6d9;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
    }

    .filtered-users-container {
      position: absolute;
      left: 12px;
      max-height: 600px;
      background: #ececec;
      width: 276px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

      .filtered-user {
        padding: 16px;
        border-bottom: 1px solid #bdc3c7;
        transition: all 0.3s ease;

        &:last-of-type {
          border-bottom: none;
        }

        &:hover {
          background: #d2d6d9;
        }
      }
    }

    .chat-list {
      display: flex;
      flex-flow: column nowrap;
      margin-top: 24px;

      .chat-item {
        padding: 8px 12px;
        transition: all 0.3s ease;

        &.active-chat {
          background: #ececec;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        &:hover {
          background: #ececec;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;

          .chat-item__username {
            font-size: 18px;
          }

          .chat-item__date {
            justify-self: right;
            font-size: 14px;
          }
        }

        .chat-item__last-msg {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          span.notification {
            font-weight: bold;
          }
        }
      }
    }
  }

  .right-container {
    position: relative;
    width: 100%;
    background: #ececec;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .chat {
      display: grid;
      height: 88%;
      overflow: auto;

      .msg-container {
        padding: 12px;
        margin-bottom: 12px;
        max-width: 600px;
        width: fit-content;
        height: fit-content;
        margin-right: 0;

        .date-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .date-row > p {
          font-size: 14px;
          opacity: 90%;
        }

        .date-row > i {
          transform: translateY(-2px);
        }

        &.sent {
          background: rgba(0, 98, 255, 0.3);
          /* Make this element to the right of the chat */

          justify-self: right;
        }

        &.received {
          background: #ffffff;
        }
      }
    }

    .send-msg-input {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      input {
        width: calc(100% - 48px);
        position: absolute;
        bottom: 12px;
        left: 24px;
        padding: 14px;
        border-radius: 3px;
        border: 1px solid gray;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
      }
    }
  }
`;
