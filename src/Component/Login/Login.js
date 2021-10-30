import { Button } from "@mui/material";
import React, { useContext } from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import StateContext from "../../Context/state-context";
const Login = () => {
  const context = useContext(StateContext);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log("Sucessfull :- ", result.user);
        context.addUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
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
  console.log("Login User", context.user);
  return (
    <div className="login">
      <div className="login__container">
        <img src="/Images/slackLogo-96.png" alt="slackLogo" />
        <h1>Sign in to Kuvlekar@slack</h1>
        <p>RahulKuvlekar.slack.com</p>
        <Button onClick={signIn}>Sign With Google</Button>
      </div>
    </div>
  );
};

export default Login;
