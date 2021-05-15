import React, { useState, useEffect } from "react";
import hamburger from "../../assets/hamburgericon.jpg";
import { useDispatch } from "react-redux";
import FilterActions from "../../redux/actions/FilterActions";
import { Multiselect } from "multiselect-react-dropdown";

function Filter({intolerance, diet}) {

	let intoleranceArr = [];
    
	intolerance.forEach(el => {
		let obj = {name: el};
		intoleranceArr.push(obj); 
	});

	const [toggle, setToggle] = useState(false);
	const [Filters, setFilters] = useState({});
	const [dietDropdown, setDietDropDown] = useState(diet);
	const [selected, setSelected] = useState({
		values: intoleranceArr,
	});
	const intolerances = {
		values: [
			{ name: "Dairy" },
			{ name: "Egg" },
			{ name: "Gluten" },
			{ name: "Grain" },
			{ name: "Peanut" },
			{ name: "Seafood" },
			{ name: "Sesame" },
			{ name: "Shellfish" },
			{ name: "Soy" },
			{ name: "Sulfite" },
			{ name: "Tree Nut" },
			{ name: "Wheat" },
		],
	};

	//Dispatch adds updated data to the store
	const dispatch = useDispatch();
   
	//this useEffect calls this dispatch function to add
	//updated data to the global store


	useEffect(() => {
		if (toggle) {
			dispatch(FilterActions(Filters));
		} else {
			dispatch(FilterActions({}));
		}
	}, [Filters, toggle, dispatch]);
	useEffect(() => {
		setFilters({});
	}, [toggle]);

	useEffect(() => {
		setFilters(prev =>{
			if(toggle){
				if(intolerance.length !== 0 && diet === "None"){
					return ({...prev, intolerances: intoleranceArr})
				} 
				else if(intolerance.length === 0 && diet !== "None"){
					return ({...prev, diet: diet})
				} else if(intolerance.length !== 0 && diet !== "None"){
					return ({...prev,intolerances: intoleranceArr, diet: diet})
				}else{
					return ({...prev});
				} 
			}else{
				return ({});
			}
		
		});
        
	}, [diet, intolerance, toggle])

	function onSelect(selectedList, selectedItem) {
		intoleranceChange("intolerances", [...selectedList]);
		setSelected({ values: [...selectedList] });
	}

	function onRemove(selectedList, RemovedItem) {
		intoleranceChange("intolerances", [...selectedList]);
		setSelected({ values: [...selectedList] });
	}

	//This function handles changes
	//for any of the filters
	//It sets the state to the current
	//Desired state so we can add it to global store
	function onChange(event) {
		let id = event.target.id;
		let value = event.target.value;
        
		if(id === "diet"){
			setDietDropDown(value);
		}
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

	const intoleranceChange = (id, value) => {
		if (value.lenght === 0) {
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
	};

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
							<select id="diet" onChange={onChange} value={dietDropdown}>
								<option value="" ></option>
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
						<p className="filter__micros">Intolerances:</p>
						{/* <input
              id="intolerances"
              className="input input__intolerances"
              type="text"
              onChange={onChange}
            /> */}
						<Multiselect
							//className="filterTweak"
							id="intolerances"
							options={intolerances.values} // Options to display in the dropdown
							selectedValues={selected.values} // Preselected value to persist in dropdown
							onSelect={onSelect} // Function will trigger on select event
							onRemove={onRemove} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
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
						<p className="filter__unit">grams</p>
					</div>

					<div className="filter__alignment">
						<p className="filter__micros">Cuisine Type:</p>
						<div className="select is-multiple">
							<select
								id="cuisine"
								size="4"
								multiple
								onChange={onChange}
								style={{ marginTop: "20px" }}
							>
								<option value=""></option>
								<option value="African">African</option>
								<option value="American"> American</option>
								<option value="British">British</option>
								<option value="dinner">Dinner</option>
								<option value="Cajun">Cajun</option>
								<option value="Caribbean"> Caribbean</option>
								<option value="Chinese">Chinese</option>
								<option value="Eastern European">Eastern European</option>
								<option value="European">European</option>
								<option value="French"> French</option>
								<option value="German">German</option>
								<option value="Greek">Greek</option>
								<option value="Indian">Indian</option>
								<option value="brunch"> Brunch</option>
								<option value="Irish">Irish</option>
								<option value="Italian">Italian</option>
								<option value="Japanese">Japanese</option>
								<option value="Jewish"> Jewish</option>
								<option value="Korean">Korean</option>
								<option value="Latin American">Latin American</option>
								<option value="Mediterranean">Mediterranean</option>
								<option value="Mexican"> Mexican</option>
								<option value="Middle Eastern">Middle Eastern</option>
								<option value="Nordic">Nordic</option>
								<option value="Southern">Southern</option>
								<option value="Spanish"> Spanish</option>
								<option value="Thai">Thai</option>
								<option value="Vietnamese">Vietnamese</option>
							</select>
						</div>
					</div>

					<div className="filter__alignment">
						<p className="filter__micros">Prep Time:</p>
						<input
							id="prepTime"
							className="input input__intolerances"
							type="text"
							onChange={onChange}
						/>
						<p className="filter__unit">Min</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Filter;
