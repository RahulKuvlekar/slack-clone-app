import React from "react";

const StateContext = React.createContext({
  user: null,
  addUser: (user) => {},
  toast: [],
  dispatchToast: () => Promise,
});

export default StateContext;
