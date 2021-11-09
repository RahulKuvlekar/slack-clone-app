import React, { useState } from "react";
import "./ChatMessage.css";
import Modal from "../UI/Modal/Modal";

const ChatMessage = (props) => {
  // console.log("Edit icon ", props.EditIcon);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [channelMessageInput, showChannelMessageInput] = useState("");

  const hideEditMessageModal = () => {
    setEditMessageModal(false);
    showChannelMessageInput("");
  };
  const OpenEditMessageModal = () => {
    setEditMessageModal(true);
    showChannelMessageInput("");
  };

  const editMessageText = () => {
    props.editMessage(channelMessageInput, props.id);
    hideEditMessageModal();
  };

  return (
    <>
      {editMessageModal && (
        <Modal onHideCart={hideEditMessageModal}>
          <div className="editModal__section">
            <div>
              <div>
                <h1>Previous Text:-</h1>
                <h2 style={{ opacity: ".6", marginTop: ".5rem" }}>
                  {props.messageText}
                </h2>
              </div>
              <hr />
            </div>
            <h1>New Text:-</h1>
            <input
              type="text"
              value={channelMessageInput}
              onChange={(event) => showChannelMessageInput(event.target.value)}
            />
            <div className="modal__btns">
              <button onClick={hideEditMessageModal}>Cancel</button>
              <button
                disabled={channelMessageInput.trim() === ""}
                onClick={editMessageText}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div id={props.id} key={props.id} className="chatbox">
        <div className="chat__message">
          <img
            src={props.userimage ? props.userimage : "/Images/user.svg"}
            alt={props.username}
          />
          <div className="chat__message__info">
            <h4>
              {props.username}
              <span className="chat__message__timestamp">
                {new Date(props.timestamp?.toDate()).toUTCString()}
              </span>
            </h4>
            <p>{props.messageText}</p>
          </div>
        </div>
        {props.EditIcon && (
          <button
            onClick={OpenEditMessageModal}
            className="edit-btn__chatmessage"
          >
            <props.EditIcon />
          </button>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
