import React from "react";
import "./SidebarOption.css";
// import { Link } from "react-router-dom";
const SidebarOption = (props) => {
  return (
    <div className="sidebarOption">
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
