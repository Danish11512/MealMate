import React, { useState, useEffect } from "react";
import { searchRecipe } from "../../spoonacular.utils";
import { searchRecipeByCuisine } from "../../spoonacular.utils";
import ResultCard from "../../components/SearchResultComponent/ResultCard.jsx";
import "./SearchResult.css";
import { useSelector } from "react-redux";
import { ReactComponent as Chef } from "../../assets/chef_logo.svg";
import { ReactComponent as ManSearch } from "../../assets/man_search.svg";
import Cooking from "../../assets/cooking.png";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SearchResultPage() {
  const [result, setResults] = useState([]);
  const [emptySet, setEmptySet] = useState("");

  const history = useHistory();
  const location = useLocation();
  const functionType = location.state.searchQuery;
  const searchValue = useSelector((state) => state.search.search);
  const filters = useSelector((state) => state.filter.filter);

  useEffect(() => {
    setTimeout(() => {
      functionType
        ? searchRecipe(searchValue, filters).then((resp) => {
            try {
              if (resp.results.length === 0 || resp === null) {
                setEmptySet(
                  "Sorry there is no result based on the combination you searced. Please try a different pattern"
                );
              } else {
                setResults(resp.results);
              }
            } catch (e) {
              setEmptySet(
                "Sorry We couldn't find any receipes. Try again with different combination"
              );
            }
          })
        : searchRecipeByCuisine(location.state.cuisineType).then((resp) => {
            try {
              if (resp.results.length === 0 || resp === null) {
                setEmptySet(
                  "Sorry there is no result based on the combination you searced. Please try a different pattern"
                );
              } else {
                setResults(resp.results);
              }
            } catch (e) {
              setEmptySet(
                "Sorry We couldn't find any receipes. Try again with different combination"
              );
            }
          });

      try {
        var myobj = document.getElementById("load__chef");
        myobj.remove();
      } catch {}
    }, 1000);
  }, []);

  return (
    <div>
      <div id="load__chef">
        <Chef className="svg__load" />
        <div className="svg__text">
          <p>Fetching Your Reciepes</p>
          <img src={Cooking} alt="cook_img" />
        </div>
      </div>
      <h1 className="your__results">Your Search Results</h1>
      <div className={"search___result"}>
        {result.length > 0 && result != null ? (
          result.map((el) => {
            return (
              <ResultCard
                image={el.image}
                text={el.title}
                id={el.id}
                key={el.id}
              />
            );
          })
        ) : emptySet !== "" ? (
          <div className="result__not__found">
            <ManSearch className="result__not__found__svg" />
            <p className="result__not__found__text">{emptySet}</p>
            <button
              className="button result__try__again"
              onClick={() => history.replace("/search")}
            >
              Try Again
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchResultPage;
