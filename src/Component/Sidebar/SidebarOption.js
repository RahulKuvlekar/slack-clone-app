import React from "react";
import { useHistory } from "react-router";
import "./SidebarOption.css";
import db from "../../firebase";
// import { Link } from "react-router-dom";
const SidebarOption = (props) => {
  const history = useHistory();
  const addChannelHandler = () => {
    const newChannelName = prompt("Please Enter the Channel Name");
    if (newChannelName) {
      db.collection("rooms").add({
        name: newChannelName,
      });
    }
  };
  const selectChannelHandler = () => {
    if (props.id) {
      history.push(`/rooms/${props.id}`);
    } else {
      history.push(`/${props.title}`);
    }
  };
  return (
    <div
      className="sidebarOption"
      onClick={props.addChannel ? addChannelHandler : selectChannelHandler}
    >
      {props.Icon && <props.Icon className="sidebarOption__icon" />}
      {props.Icon ? (
        <h3>{props.title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__icon__hash">#</span> {props.title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;
