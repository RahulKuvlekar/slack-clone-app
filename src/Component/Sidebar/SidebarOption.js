import React, { useState, useContext } from "react";
import StateContext from "../../Context/state-context";
import { useHistory } from "react-router";
import "./SidebarOption.css";
import db from "../../firebase";
import Modal from "../UI/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
// import { Link } from "react-router-dom";

const SidebarOption = (props) => {
  const context = useContext(StateContext);
  const history = useHistory();
  const [addChannelModal, setAddChannelModal] = useState(false);
  const [channelNameInput, showChannelNameInput] = useState("");
  const hideAddChannelModal = () => {
    setAddChannelModal(false);
  };
  const OpenAddChannelModal = () => {
    setAddChannelModal(true);
  };
  const addChannelHandler = () => {
    console.log(props.creatorId, " creator ID");
    if (channelNameInput.trim() !== "") {
      db.collection("rooms").add({
        name: channelNameInput,
        creatorId: props.creatorId,
        creatorName: props.creatorName,
      });

      context.dispatchToast({
        type: "ADD_NOTIFICATION",
        payload: {
          id: uuidv4(),
          type: "SUCCESS",
          title: "Sucessfull Created new Account",
          message: `${channelNameInput} Account is been created`,
        },
      });
    }
    hideAddChannelModal();
  };

  const selectChannelHandler = () => {
    if (props.id) {
      history.push(`/rooms/${props.id}`);
    } else {
      history.push(`/${props.title}`);
    }
  };
  return (
    <>
      {addChannelModal && (
        <Modal onHideCart={hideAddChannelModal}>
          <div className="editModal__section">
            <h2>New Channel Name:-</h2>
            <input
              onChange={(event) => showChannelNameInput(event.target.value)}
              type="text"
            />
            <div className="modal__btns">
              <button onClick={hideAddChannelModal}>Cancel</button>
              <button
                disabled={channelNameInput.trim() === ""}
                onClick={addChannelHandler}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={`sidebarOption ${
          props.editIcon ? "sidebarOption__channel__spaceBtw" : ""
        }`}
        onClick={props.addChannel ? OpenAddChannelModal : selectChannelHandler}
      >
        {props.Icon && <props.Icon className="sidebarOption__icon" />}
        {props.Icon ? (
          <h3>{props.title}</h3>
        ) : (
          <h3 className="sidebarOption__channel">
            <span className="sidebarOption__icon__hash">#</span> {props.title}
          </h3>
        )}
      </div>
    </>
  );
};

export default SidebarOption;
