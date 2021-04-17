import React from "react";
import Filter from "../components/Search/Filter";
import Search from "../components/Search/Search";

function SearchPage() {
  return (
    <div className="search__page">
      <div className="page__left__filter">
        <Filter />
      </div>
      <div className="page__right__search">
        <Search />
      </div>
    </div>
  );
}

export default SearchPage;
