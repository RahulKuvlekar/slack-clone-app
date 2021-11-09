import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption";
import db from "../../firebase";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import StateContext from "../../Context/state-context";
const Sidebar = () => {
  const [channel, setChannel] = useState([
    // { name: "Rahul", id: 2123123 },
    // { name: "idk", id: 21313 },
  ]);
  const context = useContext(StateContext);
  // console.log("CONTEXT SIDEBAR ", context);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      // console.log(snapshot.docs);
      return setChannel(
        snapshot.docs.map((channel) => ({
          id: channel.id,
          name: channel.data().name,
        }))
      );
    });
  }, []);

  // console.log(channel);
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__info">
          <h2>Kuvlekar@Slack</h2>
          <h3>
            <FiberManualRecordIcon />
            {context.user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Thread" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User group" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption
        Icon={AddIcon}
        title="Add Channels"
        creatorId={context.user?.uid}
        addChannel
      />
      {/* Connect to DataBase and Add More Channels */}
      {channel.length > 0 &&
        channel.map((data) => {
          // console.log(data.name);
          return <SidebarOption title={data.name} key={data.id} id={data.id} />;
        })}
    </aside>
  );
};

export default Sidebar;
