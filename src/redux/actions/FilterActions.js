const FilterAction = (data) => {
  return {
    type: "ADD_FILTER",
    payload: {
      filter: data,
    },
  };
};

export default FilterAction;
