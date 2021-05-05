import React from 'react';

import './SurveyPage.css';

const SurveyPage = () =>
{
	return(
		<div className="survey-page">
			<h1 className="survey-page-title">Survey</h1>

			<form className="survey-page-form">
				<div className="survey-page-diet-section">
					<h2>Diets</h2>
					<div className="survey-page-diet-choices">
						<span>
							<input type="radio" name="diet" id="none" value="None"/>
							<label htmlFor="none">  None</label>
						</span>
						<span>
							<input type="radio" name="diet" id="gluten-free" value="Gluten Free"/>
							<label htmlFor="gluten-free">  Gluten Free</label>
						</span>
						<span>
							<input type="radio" name="diet" id="ketogenic" value="Ketogenic"/>
							<label htmlFor="ketogenic">  Ketogenic</label>
						</span>
						<span>
							<input type="radio" name="diet" id="vegetarian" value="Vegetarian"/>
							<label htmlFor="vegetarian">  Vegetarian</label>
						</span>
						<span>
							<input type="radio" name="diet" id="vegan" value="Vegan"/>
							<label htmlFor="vegan">  Vegan</label>
						</span>
						<span>
							<input type="radio" name="diet" id="pescetarian" value="Pescetarian"/>
							<label htmlFor="pescetarian">  Pescetarian</label>
						</span>
						<span>
							<input type="radio" name="diet" id="paleo" value="Paleo"/>
							<label htmlFor="paleo">  Paleo</label>
						</span>
					</div>
				</div>

				<div className="survey-page-intolerances-section">
					<h2>Intolerances</h2>
					<div className="survey-page-intolerances-choices">

					</div>
				</div>
			</form>
		</div>
	)
}

export default SurveyPage;