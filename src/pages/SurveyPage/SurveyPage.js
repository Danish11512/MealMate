import React from 'react';

import './SurveyPage.css';

const SurveyPage = () =>
{
	const diets = ["None", "Gluten Free", "Ketogenic", "Vegetarian", "Vegan", "Pescetarian", "Paleo"];
	const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
	
	const generateDiets = () =>
	{
		return diets.map(diet =>
		{
			return(
				<span key={diet}>
					<input type="radio" name="diet" id={diet} value={diet}/>
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
					<input type="checkbox" name="intolerance" id={intolerance} value={intolerance}/>
					<label htmlFor={intolerance}>  {intolerance}</label>
				</span>
			)
		})
	}

	const handleSubmit = async (e) =>
	{
		e.preventDefault();
	}

	return(
		<div className="survey-page">
			<h1 className="survey-page-title">Survey</h1>

			<form className="survey-page-form" onSubmit={handleSubmit()}>
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