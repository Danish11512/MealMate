import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getRecipe, addMealToDay, toggleFavorite } from '../../firebase/firebase.utils';
import ReactHtmlParser from 'react-html-parser';

import './RecipeDetailsPage.css';

const RecipeDetailsPage = (props) =>
{
	const [recipe, setRecipe] = useState(null)
	const [modalClass, setModalClass] = useState("");
	const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
	const [timeValue, setTimeValue] = useState("");
	let isFavorited = (props.currentUser && recipe) ? props.currentUser.favorites.includes(String(recipe.id)) : false;

	useEffect(() =>{
		const initialize = async () =>
		{
			setRecipe(await getRecipe(props.match.params.id));
		}

		initialize()
	}, [props.match.params.id]);

	const toggleModal = () =>
	{
		if(modalClass === "")
			setModalClass("is-active")
		else
			setModalClass("")
        
	}

	const toggleFavoriteLocal = async () =>
	{
		await toggleFavorite(props.currentUser, recipe.id);
	}

	const handleAdd = async (e) =>
	{
		e.preventDefault()
		let date = new Date(dateValue.replace('-', '/')).toDateString()
		await addMealToDay(props.currentUser, recipe.id, recipe.title, recipe.calories, date, timeValue); 
		toggleModal()
	}

	if(!recipe || !props.currentUser)
		return null;
    
	return(
		<div className="recipe-details">
			<div className="recipe-details-left-panel">
				<img src={recipe.image} alt={recipe.title}/>
			</div>
			<div className="recipe-details-right-panel">
				<h1>{recipe.title} </h1>
				<div className="recipe-link"><a href={recipe.spoonacularSourceUrl} target="_blank" rel="noopener noreferrer">Link: {recipe.spoonacularSourceUrl}</a></div>
				<p className="recipe-summary">
					{ ReactHtmlParser(recipe.summary)}
				</p>
				<div className="button-container">
					<button className="add-button" onClick={toggleModal}>Add to Calendar</button>
					<i onClick={toggleFavoriteLocal} className={isFavorited ? "fas fa-star" : "far fa-star"}></i>
				</div>
			</div>

			<div className={`modal ${modalClass}`}>
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Add to Calendar</p>
						<button className="delete" aria-label="close" onClick={toggleModal}></button>
					</header>
					<form onSubmit={(e) => handleAdd(e)}>
						<section className="modal-card-body">
							Date: <input type="date" id="date" name="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} required/> <br/> <br />
							Time: <input type="time" id="time" name="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} required/>
						</section>
						<footer className="modal-card-foot">
							<button type="submit" className="button is-success">Add</button>
							<button className="button" onClick={toggleModal}>Cancel</button>
						</footer>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(RecipeDetailsPage);