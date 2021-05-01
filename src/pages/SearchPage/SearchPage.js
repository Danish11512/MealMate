import React from "react";
import Filter from "../../components/SearchComponent/Filter";
import Search from "../../components/SearchComponent/Search";
import Recommendation from "../../components/SearchComponent/Recommendation";
import "./SearchPage.css";

function SearchPage() {
  return (
    <div className="search__page">
      <div className="page__left__filter">
        <Filter />
      </div>
      <div className="page__right__search">
        <Search />
        <Recommendation />
      </div>
    </div>
  );
}

export default SearchPage;
