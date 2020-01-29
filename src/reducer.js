import data from "./data.json";
let initialState = {
  content: data,
  cart: window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [],
  formData: {
    name: "",
    lastName: "",
    email: "",
    country: "USA",
    message: "",
  },
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
    case "ADD_ITEM_COUNT":
      return {
        ...state,
        cart: [...state.cart, +action.id],
      };
    case "REMOVE_ITEM_COUNT":
      let cartItems = state.cart.slice();
      cartItems.splice(cartItems.indexOf(+action.id), 1);
      return {
        ...state,
        cart: [...cartItems],
      };
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, [action.name]: action.value },
      };
    case "RESET_CART":
      return {
        ...state,
        cart: [],
        formData: { ...initialState.formData },
      };
    default:
      return state;
  }
}

export default reducer;
