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

    .chat-list {
      display: flex;
      flex-flow: column nowrap;
      margin-top: 24px;

      .chat-item {
        padding: 8px 12px;
        transition: all 0.3s ease;

        &.active-chat {
          background: #f4f4f4;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        &:hover {
          background: #f4f4f4;
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
        }
      }
    }
  }

  .right-container {
    width: 100%;
    background: #f4f4f4;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
