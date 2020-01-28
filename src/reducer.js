import data from "./data.json";
let initialState = {
  content: data,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
