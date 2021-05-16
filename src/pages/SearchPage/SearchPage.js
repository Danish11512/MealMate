import React from "react";
import Filter from "../../components/SearchComponent/Filter";
import Search from "../../components/SearchComponent/Search";
import Recommendation from "../../components/SearchComponent/Recommendation";
import "./SearchPage.css";

function SearchPage({currentUser}) {
	return (
		<div className="search__page">
			<div className="page__left__filter">
				<Filter intolerance = {currentUser.intolerances} diet = {currentUser.diet}/>
			</div>
			<div className="page__right__search">
				<Search />
				<Recommendation className="circle__alignments"/>
			</div>
		</div>
	);
}

export default SearchPage;
