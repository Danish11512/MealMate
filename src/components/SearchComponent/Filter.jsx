import React, { useState, useEffect } from "react";
import hamburger from "../../assets/hamburgericon.jpg";
import { useDispatch } from "react-redux";
import FilterActions from "../../redux/actions/FilterActions";

function Filter() {
  const [toggle, setToggle] = useState(false);
  const [Filters, setFilters] = useState({});

  //Dispatch adds updated data to the store
  const dispatch = useDispatch();

  //this useEffect calls this dispatch function to add
  //updated data to the global store

  useEffect(() => {
    if (toggle) {
      dispatch(FilterActions(Filters));
    } else {
      dispatch(FilterActions(Filter));
    }
  }, [Filters, toggle, dispatch]);

  useEffect(() => {
    setFilters({});
  }, [toggle]);

  //This function handles changes
  //for any of the filters
  //It sets the state to the current
  //Desired state so we can add it to global store
  async function onChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    //This is validation if user deletes a filter
    //It will remove the key from the useState object
    if (value.trim() === "") {
      setFilters((prevValue) => {
        prevValue = Object.keys(prevValue)
          .filter((key) => key !== id)
          .reduce((obj, key) => {
            obj[key] = prevValue[key];
            return obj;
          }, {});

        return { ...prevValue };
      });
    } else {
      setFilters((prevValue) => ({ ...prevValue, [id]: value }));
    }
  }

  return (
    <div className="hamburger">
      {!toggle ? (
        <img
          src={hamburger}
          onClick={() => setToggle(true)}
          alt="hamburger__img"
        ></img>
      ) : (
        <div className="filters">
          <button
            className="delete is-medium delete__postion"
            onClick={() => setToggle(false)}
          ></button>
          <div className="filter__alignment">
            <p className="filter__micros">Diet: </p>
            <div className="select">
              <select id="diet" onChange={onChange}>
                <option value=""></option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Whole30">Whole30</option>
              </select>
            </div>
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Intolerances:</p>
            <input
              id="intolerances"
              className="input input__intolerances"
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Max Carbs:</p>
            <input
              id="max_carbs"
              className="input input__intolerances"
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Meal type:</p>
            <div className="select">
              <select id="mealType" onChange={onChange}>
                <option value=""></option>
                <option value="breakfast">Breakfast</option>
                <option value="brunch"> Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Cuisine:</p>
            <input
              id="cusine"
              className="input input__intolerances"
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Prep Time:</p>
            <input
              id="prepTime"
              className="input input__intolerances"
              type="text"
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
