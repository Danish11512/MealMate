const SearchActions = (data) => {
  return {
    type: "ADD_SEARCH",
    payload: {
      search: data,
    },
  };
};

export default SearchActions;
