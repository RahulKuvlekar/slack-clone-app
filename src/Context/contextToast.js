import { createContext, useReducer } from "react";
import toastReducer from "./toastReducer";
import { v4 as uuidv4 } from "uuid";

export const contextToast = createContext({
  toast: [],
  dispatchToast: () => Promise,
});

const ContextToastProvider = (props) => {
  const [stateToast, dispatchToast] = useReducer(toastReducer, [
    {
      id: uuidv4(),
      type: "SUCCESS",
      title: "success",
      message: "seccessfully complete",
    },
    {
      id: uuidv4(),
      type: "INFO",
      title: "Info",
      message: "Some Information",
    },
    {
      id: uuidv4(),
      type: "WARNING",
      title: "warning",
      message: "This Warning",
    },
    {
      id: uuidv4(),
      type: "DANGER",
      title: "Danger",
      message: "you are in danger",
    },
  ]);

  const DEFAULT_VALUE = {
    toast: stateToast,
    dispatchToast,
  };
  return (
    <contextToast.Provider value={DEFAULT_VALUE}>
      {props.children}
    </contextToast.Provider>
  );
};

export default ContextToastProvider;
