import data from "./data.json";
let initialState = {
  content: data,
  cart: window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.variantId],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: [
          ...state.cart.filter(id => {
            return id !== action.id;
          }),
        ],
      };
    default:
      return state;
  }
}

export default reducer;
