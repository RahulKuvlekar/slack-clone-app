import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import db from "../../firebase";
import "./ChatInputMessage.css";
import firebase from "firebase/compat/app";
import StateContext from "../../Context/state-context";

const ChatInputMessage = (props) => {
  const context = useContext(StateContext);
  const [input, setInput] = useState("");

  const sendMessageHandler = (event) => {
    event.preventDefault();

    if (props.channelId) {
      db.collection("rooms").doc(props.channelId).collection("messages").add({
        messageText: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: context.user.displayName,
        userimage: context.user.photoURL,
        userId: context.user.uid,
      });
      setInput("");
    }
    // console.log("SET INPUT", setInput);
  };

  return (
    <section className="chatInputMessage">
      {/* <input type="text" /> */}
      <form>
        <input
          onChange={(event) => setInput(event.target.value)}
          value={input}
          type="text"
          placeholder="Enter your Message"
        />
        <Button type="submit" onClick={sendMessageHandler}>
          Send
        </Button>
      </form>
    </section>
  );
};

export default ChatInputMessage;
