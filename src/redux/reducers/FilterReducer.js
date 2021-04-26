const FilterReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      return action.payload;

    default:
      return state;
  }
};

export default FilterReducer;
