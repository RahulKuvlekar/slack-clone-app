import React, { useEffect, useState } from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import db from "../../firebase";
import { useParams } from "react-router";
import ChatMessage from "./ChatMessage";
import ChatInputMessage from "./ChatInputMessage";
// import { collection, getDocs } from "firebase/firestore";

const Chat = () => {
  //   const roomsCollection = collection(db, "rooms");
  const [channel, setChannel] = useState();
  const [channelMessage, setChannelMessage] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          //   console.log(snapshot.data());
          return setChannel(snapshot.data());
        });
      console.log();

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setChannelMessage(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
    }
  }, [roomId]);
  //   console.log("ChannelData", channelMessage);
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{channel?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon />
            Details
          </p>
        </div>
      </div>
      <div className="chat__message__section">
        {channelMessage.length > 0 &&
          channelMessage?.map((data) => (
            <ChatMessage
              messageText={data.messageText}
              username={data.username}
              userimage={data.userimage}
              timestamp={data.timestamp}
              id={data.id}
              // data={data}
            />
          ))}
      </div>
      <ChatInputMessage channelName={channel?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
