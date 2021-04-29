import React, { useState, useEffect } from "react";
import { searchRecipe } from "../../spoonacular.utils";
import ResultCard from "../../components/SearchResultComponent/ResultCard.jsx";
import "./SearchResult.css";
import { useSelector } from "react-redux";
import { ReactComponent as Chef } from "../../assets/chef_logo.svg";

function SearchResultPage() {
  const [result, setResults] = useState([]);
  const [emptySet, setEmptySet] = useState("");

  const searchValue = useSelector((state) => state.search.search);
  const filters = useSelector((state) => state.filter.filter);

  useEffect(() => {
    searchRecipe(searchValue, filters).then((resp) => {
      console.log(resp);
      if (resp.results.length === 0) {
        setEmptySet(
          "Sorry there is no result based on the combination you searced. Please try a different pattern"
        );
      } else {
        setResults(resp.results);
      }

      //   try {
      //     var myobj = document.getElementById("load__chef");
      //     myobj.remove();
      //   } catch {}
    });
  }, []);

  return (
    <div>
      {/* <div id="load__chef">
        <Chef className="svg__load" />
      </div> */}
      <h1 className="your__results">Your Search Results</h1>
      <div className={"search___result"}>
        {result.length > 0 ? (
          result.map((el) => {
            return <ResultCard image={el.image} text={el.title} id={el.id}/>;
          })
        ) : (
          <p>{emptySet}</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
