import React, { useContext, useState } from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StateContext from "../../Context/state-context";

const Header = (props) => {
  const context = useContext(StateContext);
  const [showButton, setShowButton] = useState(false);
  // console.log("HEADER => ", context);
  const showLogoutButton = () => {
    setShowButton((prevState) => {
      return !prevState;
    });
  };

  if (showButton === true) {
    setTimeout(() => {
      console.log("Show button executed ");
      setShowButton(false);
    }, 5000);
  }
  return (
    <div className="header">
      <div className="header__left" style={{ width: "10%" }}>
        {context.user?.photoURL ? (
          <img
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            src={context.user?.photoURL}
            alt={context.user?.displayName}
            onClick={showLogoutButton}
          />
        ) : (
          <Avatar
            className="header__avatar"
            style={{ cursor: "pointer" }}
            onClick={showLogoutButton}
          />
        )}
        {showButton && (
          <ul
            style={{
              position: "absolute",
              top: "3.7rem",
              left: ".5rem",
              backgroundColor: "white",
              width: "150px",
              margin: "0",
              padding: "0",
            }}
          >
            <li>
              <button className="logout__Btn" onClick={props.onClick}>
                SignOut
              </button>
            </li>
          </ul>
        )}
        {/* <AccessTimeIcon /> */}
      </div>
      <h1 style={{ width: "90%", textAlign: "center" }}>Kuvlekar@Slack.Com</h1>
      {/* <div className="header__search">
        <SearchIcon fontSize="large" />
        <input type="text" placeholder="Search Channels" />
      </div>
      <div className="header__right">
        <HelpOutlineIcon />
      </div> */}
    </div>
  );
};

export default Header;
