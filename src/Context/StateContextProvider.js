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
  const GUEST_ID = {
    displayName: "Guest User",
    email: "MrGuestUser@gmail.com",
    phoneNumber: "007007007",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/50px-Flag_of_India.svg.png",
    providerId: "Guest",
    uid: "GuestUserKJ3yeHZW7Yalvm0Skmo4As7o2S73GuestUser",
  };

  const addUserHandler = (user) => {
    dataDispatch({ task: "SET_USER", user: user });
  };
  const LoginGuestUserHandler = (user) => {
    dataDispatch({ task: "SET_USER", user: GUEST_ID });
    localStorage.setItem("user", JSON.stringify(GUEST_ID));
  };

  const dataContext = {
    user: dataState.user,
    addUser: addUserHandler,
    loginAsGuest: LoginGuestUserHandler,
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
