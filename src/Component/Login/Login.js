import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
const Login = () => {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Sucessfull :- ",result);
      })
      .catch((error) => {
        console.log(
          "Error Code :- ",
          error.code,
          "\nError Message :- ",
          error.message,
          "\nError EmailId :- ",
          error.email
        );
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://thumbs.bfldr.com/at/pl546j-7le8zk-6gwiyo/v/2925175?expiry=1634096099&fit=bounds&height=162&sig=OTRhMDExZTdjNTBhNzY1MGY2YTY4NDhmNDRiMDVkYzlmYTgwZmQwZg%3D%3D&width=262"
          alt="slackLogo"
        />
        <h1>Sign in to Kuvlekar@slack</h1>
        <p>RahulKuvlekar.slack.com</p>
        <Button onClick={signIn}>Sign With Google</Button>
      </div>
    </div>
  );
};

export default Login;
