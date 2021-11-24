import React, { useEffect, useState, useContext } from "react";
import StateContext from "../../Context/state-context";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import db from "../../firebase";
import { useHistory, useParams } from "react-router";
import ChatMessage from "./ChatMessage";
import ChatInputMessage from "./ChatInputMessage";
import Modal from "../UI/Modal/Modal";
import { v4 as uuidv4 } from "uuid";

// import { collection, getDocs } from "firebase/firestore";

const Chat = () => {
  const context = useContext(StateContext);
  const history = useHistory();
  //   const roomsCollection = collection(db, "rooms");
  const [channel, setChannel] = useState({ creatorId: "" });
  const [channelMessage, setChannelMessage] = useState([]);
  const { roomId } = useParams();
  const [editNameModal, showEditNameModal] = useState(false);
  const [deleteChannelModal, setDeleteChannelModal] = useState(false);
  const [channelNameInput, showChannelNameInput] = useState("");
  const [getDetails, setGetDetails] = useState(false);
  // console.log("SET CHANNEL ", channel);
  const hideDeleteNameModal = () => {
    setDeleteChannelModal(false);
  };
  const OpenDeleteNameModal = () => {
    setDeleteChannelModal(true);
  };

  const hideEditNameModal = () => {
    showEditNameModal(false);
    showChannelNameInput("");
  };
  const OpenEditNameModal = () => {
    showEditNameModal(true);
    showChannelNameInput("");
  };

  const deleteChannel = () => {
    // console.log(roomId);
    db.collection("rooms").doc(roomId).delete();
    context.dispatchToast({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        type: "SUCCESS",
        title: "Successfuly Deletion",
        message: `${channel?.name} Channel is been Deleted Sucessfully`,
      },
    });
    hideDeleteNameModal();
    history.push("/rooms/ElfSRyJmz5Crdmtrr2gk");
  };
  const editChannelname = () => {
    // console.log(roomId);
    if (channelNameInput.trim() !== "") {
      db.collection("rooms").doc(roomId).update({ name: channelNameInput });

      context.dispatchToast({
        type: "ADD_NOTIFICATION",
        payload: {
          id: uuidv4(),
          type: "INFO",
          title: "Account Name Changes",
          message: `Account Name is been changed ${channelNameInput}`,
        },
      });
    }
    hideEditNameModal();
  };
  const editMessage = (newMessageText, id) => {
    // console.log(roomId);
    if (newMessageText.trim() !== "") {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .doc(id)
        .update({ messageText: newMessageText });

      context.dispatchToast({
        type: "ADD_NOTIFICATION",
        payload: {
          id: uuidv4(),
          type: "INFO",
          title: "Text Changed",
          message: `Text Message is been changed to ${newMessageText}`,
        },
      });
    }
    hideEditNameModal();
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          console.log("Channel Data ", snapshot.data());
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
    <>
      {deleteChannelModal && (
        <Modal onHideCart={hideDeleteNameModal}>
          <div className="editModal__section">
            <div
              style={{ textAlign: "center", opacity: ".6", marginTop: "1rem" }}
            >
              <h2>Are you sure you want to delete this Channel ???</h2>
            </div>
            <div className="modal__btns">
              <button onClick={hideDeleteNameModal}>Cancel</button>
              <button onClick={deleteChannel}>Confirm</button>
            </div>
          </div>
        </Modal>
      )}
      {editNameModal && (
        <Modal onHideCart={hideEditNameModal}>
          <div className="editModal__section">
            <div>
              <div>
                <h1>Previous Name:-</h1>
                <h2 style={{ opacity: ".6", marginTop: ".5rem" }}>
                  {channel?.name}
                </h2>
              </div>
              <hr />
            </div>
            <h1>New Name:-</h1>
            <input
              type="text"
              value={channelNameInput}
              onChange={(event) => showChannelNameInput(event.target.value)}
            />
            <div className="modal__btns">
              <button onClick={hideEditNameModal}>Cancel</button>
              <button
                disabled={channelNameInput.trim() === ""}
                onClick={editChannelname}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <h4 className="chat__channelName">
              <strong>#{channel?.name}</strong>
              <StarBorderOutlinedIcon />
            </h4>
          </div>
          <div className="chat__headerRight">
            {context.user?.uid === channel?.creatorId && (
              <button onClick={OpenEditNameModal}>
                <EditIcon />
                Edit
              </button>
            )}
            {context.user?.uid === channel?.creatorId && (
              <button onClick={OpenDeleteNameModal}>
                <DeleteIcon />
                Delete
              </button>
            )}
            <button
              className="details__btn"
              style={{
                backgroundColor: `${
                  getDetails ? "rgb(209, 208, 208)" : "white"
                }`,
              }}
              onClick={() => {
                setGetDetails((prevState) => !prevState);
              }}
            >
              <InfoOutlinedIcon />
              Details
              <ul style={{ display: `${getDetails ? "block" : "none"}` }}>
                <li>
                  Admin-{" "}
                  {channel?.creatorName
                    ? channel?.creatorName
                    : "Kuvlekar@Slack"}
                </li>
              </ul>
            </button>
          </div>
        </div>
        <div className="chat__message__section">
          {channelMessage.length > 0 &&
            channelMessage?.map((data, idx) => (
              <ChatMessage
                messageText={data.messageText}
                username={data.username}
                userimage={data.userimage}
                userId={data.userId}
                timestamp={data.timestamp}
                id={data.id}
                key={idx}
                editMessage={editMessage}
                EditIcon={context.user?.uid === data.userId ? EditIcon : false}
              />
            ))}
        </div>
        <ChatInputMessage channelName={channel?.name} channelId={roomId} />
      </div>
    </>
  );
};

export default Chat;
