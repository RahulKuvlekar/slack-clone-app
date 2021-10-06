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

  const editChannelname = () => {
    const editedName = prompt("Please New the Channel Name");
    if (editedName) {
      db.collection("rooms").doc(props.id).update({ name: editedName });
    }
    // if (editedName) {
    //   db.collection("rooms").doc(props.id).delete();
    // }
    // console.log(db.collection("rooms").doc(props.id));
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
      className={`sidebarOption ${
        props.editIcon ? "sidebarOption__channel__spaceBtw" : ""
      }`}
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
      <div onClick={editChannelname}>
        {props.editIcon && <props.editIcon />}
      </div>
    </div>
  );
};

export default SidebarOption;
