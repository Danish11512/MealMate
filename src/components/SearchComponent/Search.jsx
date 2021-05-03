import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import searchAction from "../../redux/actions/SearchActions";
import { useHistory } from "react-router-dom";

function Search() {
	//To control whats typed in the searchbar
	const [searchVal, setSearchVal] = useState("");

	//For dispatching actions to run the reducers(REDUX)
	const dispatch = useDispatch();

	//For routing
	const history = useHistory();

	useEffect(() => {
		dispatch(searchAction(searchVal));
	}, [searchVal, dispatch]);

	const validStringFunction = (val) => {
		var regex = new RegExp("^[a-zA-Z]+$");
		if (typeof val === "undefined" || val === "" || !regex.test(val)) {
			return false;
		}
		return true;
	};

	return (
		<div className="search__side">
			<div className="search__bar">
				<div className="control has-icons-right">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (validStringFunction(searchVal)) {
								document.getElementById("error").innerHTML = "";
								history.push("/results", { searchQuery: true });
							} else {
								document.getElementById("error").innerHTML =
                  "Invalid search value";
							}
						}}
					>
						<input
							key="searchinput"
							className="input is-medium"
							placeholder="Search"
							value={searchVal}
							onChange={(e) => {
								setSearchVal(e.target.value);
							}}
							required
						/>

						<span className="icon is-right" type="submit">
							<i className="fas fa-search"></i>
						</span>
					</form>
					<p id="error"></p>
				</div>
			</div>
			<h1 className="below__search__text">Find your Cravings</h1>
		</div>
	);
}

export default Search;
