import React, {useState} from 'react';
import { changeSurveyAnswers } from '../../firebase/firebase.utils';

import './SurveyPage.css';

const SurveyPage = (props) =>
{
	const diets = ["None", "Gluten Free", "Ketogenic", "Vegetarian", "Vegan", "Pescetarian", "Paleo"];
	const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
	const [intolerancesChoices, setIntolerancesChoices] = useState(props.currentUser.intolerances)
	const [dietChoice, setDietChoice] = useState(props.currentUser.diet)

	const generateDiets = () =>
	{
		return diets.map(diet =>
		{
			return(
				<span key={diet}>
					<input type="radio" name="diet" id={diet} value={diet} checked={dietChoice === diet} onChange={(e) => handleDietChange(e)}/>
					<label htmlFor={diet}>  {diet}</label>
				</span>
			)
		})
	}

	const generateIntolerances = () =>
	{
		return intolerances.map(intolerance =>{
			return(
				<span key={intolerance}>
					<input type="checkbox" name="intolerance" id={intolerance} value={intolerance} checked={intolerancesChoices.includes(intolerance)}  onChange={(e) => handleIntolerancesChange(e)}/>
					<label htmlFor={intolerance}>  {intolerance}</label>
				</span>
			)
		})
	}
	const handleDietChange = (e) =>
	{
		setDietChoice(e.target.value)
	}

	const handleIntolerancesChange = (e) =>
	{
		let tempIntolerances = [...intolerancesChoices];
		const index = intolerancesChoices.indexOf(e.target.value);

		if(index === -1)
			tempIntolerances.push(e.target.value);
		else
			tempIntolerances.splice(index, 1);

		setIntolerancesChoices(tempIntolerances)
		
	}

	const handleSubmit = async (e) =>
	{
		e.preventDefault();
		await changeSurveyAnswers(props.currentUser.uid, intolerancesChoices, dietChoice)
		alert("Preferences Updated")
	}
	
	return(
		<div className="survey-page">
			<h1 className="survey-page-title">Survey</h1>

			<form className="survey-page-form" onSubmit={e => handleSubmit(e)}>
				<div className="survey-page-diet-section">
					<h2>Diets</h2>
					<div className="survey-page-diet-choices">
						{generateDiets()}
					</div>
				</div>

				<div className="survey-page-intolerances-section">
					<h2>Intolerances</h2>
					<div className="survey-page-intolerances-choices">
						{generateIntolerances()}
					</div>
				</div>
				<button type="submit" className="button is-success save-button">Save</button>
			</form>
		</div>
	)
}

export default SurveyPage;