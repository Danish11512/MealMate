import React, { useState } from "react";
import "./Survey.css";
import Modal from './Modal';
import SurveyPage  from '../../pages/SurveyPage/SurveyPage.js';
import { changeSurveyAnswers } from '../../firebase/firebase.utils';


function handleSubmit(e) {
	alert('Submitted Survey Response');
	e.preventDefault();
}



function SurveyForm ({props}) {

	const [modalOpen, setmodalOpen] = useState(false);

	const handleClick = () => {
		setmodalOpen(!modalOpen)
	};
	  
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

	const active = modalOpen ? "is-active" : "";

	return (
		<div className="App">
    
    
			<div className={`modal ${active}`}>
				<div className="modal-background" onClick={handleClick}/>
				<div className="modal-card">

					<header className="modal-card-head">
						<p className="modal-card-title">Review Survey Information</p>
						<button
							onClick={handleClick}
							className="delete"
							aria-label="close"
						/>
					</header>


					<section className="modal-card-body">

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
							</form>
						</div>

					</section>

					<footer className="modal-card-foot">
						<button onClick={handleSubmit} className="button is-success">Save changes</button>
						<button onClick={handleClick} className="button">
                    Cancel
						</button>
					</footer>

				</div>
			</div>
    
			<button onClick={handleClick} className="button is-small is-info">
              Show Modal
			</button>

		</div>
	);
}






export default SurveyForm;