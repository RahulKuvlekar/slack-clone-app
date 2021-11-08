import React, { useContext } from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StateContext from "../../Context/state-context";

const Header = (props) => {
  const context = useContext(StateContext);
  // console.log("HEADER => ", context);
  return (
    <div className="header">
      <div className="header__left">
        {context.user?.photoURL ? (
          <img
            style={{ width: "3rem", borderRadius: "50%", cursor: "pointer" }}
            src={context.user?.photoURL}
            alt={context.user?.displayName}
            onClick={props.onClick}
          />
        ) : (
          <Avatar
            className="header__avatar"
            style={{ cursor: "pointer" }}
            onClick={props.onClick}
          />
        )}
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon fontSize="large" />
        <input type="text" placeholder="Search Channels" />
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
};

export default Header;
