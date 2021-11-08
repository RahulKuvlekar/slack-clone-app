import React, { useReducer } from "react";
import StateContext from "./state-context";
import toastReducer from "./toastReducer";

const defaultState = {
  //   user: { displayName: "rahul" },
  user: JSON.parse(localStorage.getItem("user")),
};

const dataReducer = (prevState, action) => {
  console.log("dataReduct action ", action, "prevState ", prevState);
  switch (action.task) {
    case "SET_USER":
      return {
        ...prevState,
        user: action.user,
      };

    default:
      return prevState;
  }
};

const StateContextProvider = (props) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, defaultState);

  const [stateToast, dispatchToast] = useReducer(toastReducer, []);

  const addUserHandler = (user) => {
    dataDispatch({ task: "SET_USER", user: user });
  };

  const dataContext = {
    user: dataState.user,
    addUser: addUserHandler,
    toast: stateToast,
    dispatchToast,
  };
  return (
    <StateContext.Provider value={dataContext}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
