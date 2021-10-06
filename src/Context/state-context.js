import React from "react";

const StateContext = React.createContext({
  user: null,
  addUser: (user) => {},
});

export default StateContext;
