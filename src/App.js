import "./App.css";
import React, { useState } from "react";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Component/Chat/Chat";
import Login from "./Component/Login/Login";
function App() {
  const [user, setUser] = useState(null);
  console.log(setUser);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
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
