const SearchReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SEARCH":
      return action.payload;

    default:
      return state;
  }
};

export default SearchReducer;
