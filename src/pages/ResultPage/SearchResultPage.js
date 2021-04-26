import React, { useState, useEffect } from "react";
import { searchRecipe } from "../../spoonacular.utils";
import ResultCard from "../../components/SearchResultComponent/ResultCard.jsx";
import "./SearchResult.css";
import { useSelector } from "react-redux";

function SearchResultPage() {
  const [result, setResults] = useState([]);

  const searchValue = useSelector((state) => state.search.search);
  const { diet } = useSelector((state) => state.filter.filter);
  const { intolerances } = useSelector((state) => state.filter.filter);

  useEffect(() => {
    searchRecipe(searchValue, diet, intolerances).then((resp) => {
      setResults(resp.results);
    });
  }, []);

  return (
    <div className={"search___result"}>
      {result.map((el) => {
        return <ResultCard image={el.image} text={el.title} />;
      })}
    </div>
  );
}

export default SearchResultPage;
