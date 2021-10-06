import React from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const Header = (props) => {
  return (
    <div className="header">
      <div className="header__left">
        <Avatar className="header__avatar" onClick={props.onClick} />
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
