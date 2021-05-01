import React, { useState } from "react";
import { useDispatch } from "react-redux";
import searchAction from "../../redux/actions/SearchActions";
import { useHistory } from "react-router-dom";

function Search() {
  //To control whats typed in the searchbar
  const [searchVal, setSearchVal] = useState([]);

  //For dispatching actions to run the reducers(REDUX)
  const dispatch = useDispatch();

  //For routing
  const history = useHistory();

  return (
    <div className="search__side">
      <div className="search__bar">
        <div className="control has-icons-right">
          <form
            onSubmit={(e) => {
              history.push("/results", { searchQuery: true });
            }}
          >
            <input
              key="searchinput"
              className="input is-medium"
              type="text"
              placeholder="Search"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                dispatch(searchAction(e.target.value));
              }}
            />

            <span className="icon is-right">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </div>
      <h1 className="below__search__text">Find your Cravings</h1>
    </div>
  );
}

export default Search;
