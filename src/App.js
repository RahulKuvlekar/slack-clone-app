import "./App.css";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Component/Chat/Chat";
function App() {
  return (
    <Router>
      <div className="App">
        <h1>SLACK CLONE</h1>
        <Header />
        <div className="app__body">
          <Sidebar />
          {/* React Router Chat Screen  */}
          <Switch>
            <Route exact path="/">
              <h1>Welcome Home</h1>
            </Route>
            <Route path="/room/:roomId">
              <Chat/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
