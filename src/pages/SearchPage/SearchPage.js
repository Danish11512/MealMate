import React, { useState } from "react";
import Filter from "../../components/SearchComponent/Filter";
import Search from "../../components/SearchComponent/Search";
import Recommendation from "../../components/SearchComponent/Recommendation";
import "./SearchPage.css";

function SearchPage() {
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");

  const submit = (value) => (e) => {
    console.log(value);
    e.preventDefault();

    setSearch(value);
  };

  console.log(search);

  return (
    <div className="search__page">
      <div className="page__left__filter">
        <Filter />
      </div>
      <div className="page__right__search">
        <Search change={submit} />
        <Recommendation />
      </div>
    </div>
  );
}

export default SearchPage;
