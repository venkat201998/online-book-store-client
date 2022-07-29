let initialState = [];

// load cart items from local storage
// if (typeof window !== "undefined") {
//   if (localStorage.getItem("cart")) {
//     initialState = JSON.parse(localStorage.getItem("cart"));
//   } else {
//     initialState = [];
//   }
// }

export const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DUMMY_ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};