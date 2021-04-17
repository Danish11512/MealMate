import React, { useState } from "react";
import hamburger from "../static/hamburgericon.png";
import "../../styles/SearchPage.css";

function Filter() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="hamburger">
      {!toggle ? (
        <img src={hamburger} onClick={() => setToggle(true)}></img>
      ) : (
        <div className="filters">
          <button
            className="delete is-medium delete__postion"
            onClick={() => setToggle(false)}
          ></button>
          <div className="filter__alignment">
            <p className="filter__micros">Diet: </p>
            <div class="select">
              <select>
                <option value="low carb">Low Carb</option>
                <option value="high protien">High Protien</option>
                <option value="low sodium">Low sodium</option>
                <option value="low fat">Low Fat</option>
              </select>
            </div>
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Intolerances:</p>
            <input className="input input__intolerances" type="text" />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Max Carbs:</p>
            <input className="input input__intolerances" type="text" />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Meal type:</p>
            <div className="select">
              <select>
                <option value="breakfast">Breakfast</option>
                <option value="brunch"> Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Cusine:</p>
            <input className="input input__intolerances" type="text" />
          </div>

          <div className="filter__alignment">
            <p className="filter__micros">Prep Time:</p>
            <input className="input input__intolerances" type="text" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
