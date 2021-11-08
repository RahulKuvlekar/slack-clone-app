const toastReducer = (prevState, action) => {
  // console.log("previous wali state => ", prevState);
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...prevState, action.payload];

    case "DELETE_NOTIFICATION":
      // console.log(prevState);
      return prevState.filter((toast) => toast.id !== action.payload);

    default:
      return prevState;
  }
};

export default toastReducer;
