import { Button } from "@mui/material";
import React, { useContext } from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import StateContext from "../../Context/state-context";
import Toast from "../UI/Toast/Toast";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const context = useContext(StateContext);
  // const [inLogin, setInLogin] = React.useState(false);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log("Sucessfull :- ", result.user);
        context.addUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        context.dispatchToast({
          type: "ADD_NOTIFICATION",
          payload: {
            id: uuidv4(),
            type: "SUCCESS",
            title: "LOGIN Successfully",
            message: "You are been LOGIN to @RAHUL SLACK",
          },
        });
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
        context.dispatchToast({
          type: "ADD_NOTIFICATION",
          payload: {
            id: uuidv4(),
            type: "DANGER",
            title: "Failed Login",
            message: error.message,
          },
        });
      });
  };
  // console.log("Login User", context.user);
  return (
    <div className="login">
      <Toast position="top-left" autoDeleteInterval={4000} />
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
