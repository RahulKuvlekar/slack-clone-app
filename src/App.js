import "./App.css";
import React, { useContext } from "react";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Component/Chat/Chat";
import Login from "./Component/Login/Login";
import StateContext from "./Context/state-context";
import { auth } from "./firebase";
import Toast from "./Component/UI/Toast/Toast";
import { v4 as uuidv4 } from "uuid";

function App() {
  const context = useContext(StateContext);
  // console.log("Context => ", context);

  const signOut = () => {
    auth.signOut().then(() => {
      context.addUser(null);
      localStorage.removeItem("user");
      context.dispatchToast({
        type: "ADD_NOTIFICATION",
        payload: {
          id: uuidv4(),
          type: "SUCCESS",
          title: "Logout Successfully",
          message: "You are been Logout.Thank You",
        },
      });
    });
  };

  return (
    <Router>
      {!context.user ? (
        <Login />
      ) : (
        <div className="App">
          <Toast position="top-left" autoDeleteInterval={4000} />
          <Header onClick={signOut} />
          <div className="app__body">
            <Sidebar />
            {/* React Router Chat Screen  */}
            <Switch>
              <Route exact path="/">
                <h1>Welcome Home</h1>
              </Route>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route>
                <h1>Error Not Found</h1>
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
