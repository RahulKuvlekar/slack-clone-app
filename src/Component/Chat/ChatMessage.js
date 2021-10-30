import React from "react";
import "./ChatMessage.css";
const ChatMessage = (props) => {
  return (
    <div id={props.id} key={props.id} className="chat__message">
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
  );
};

export default ChatMessage;
