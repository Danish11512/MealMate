import React from "react";
import Collapsible from 'react-collapsible';
import "./Survey.css";

function handleSubmit(e) {
	alert('Submitted Survey Response');
	e.preventDefault();
}

function SurveyForm ()
{
	return (
		<Collapsible trigger = "Review Survey Information" classParentString = "survey_info" >

			<br/>
			<form onSubmit={handleSubmit}>
                    
				<div className = "survey_diet">
                         
					<h1>Diet Types</h1>
					<br/>
					<label for = "gluten_free"> 
						<input type="checkbox" name = "gluten_free" />
                              Gluten Free 
					</label>

					<label for = "ketogenic"> 
						<input type="checkbox" name = "ketogenic"/>
                              Ketogenic 
					</label>
                         
					<label for = "vegetarian"> 
						<input type="checkbox" name = "vegetarian" />
                              Vegetarian 
					</label>

					<label for = "vegan"> 
						<input type="checkbox" name = "vegan"/>
                              Vegan 
					</label>
                         
					<label for = "pescetarian"> 
						<input type="checkbox" name = "pescetarian"/>
                              Pescetarian 
					</label>

					<label for = "paleo"> 
						<input type="checkbox" name = "paleo" />
                              Paleo 
					</label>
				</div>
                    
				<div className = "survey_intolerances">

					<br/>
					<h1>Intolerances</h1>
					<br/>

					<label for = "dairy"> 
						<input type="checkbox" name = "dairy" />
                              Dairy
					</label>
                         
					<label for = "egg"> 
						<input type="checkbox" name = "egg"/>
                              Egg
					</label>

					<label for = "gluten"> 
						<input type="checkbox" name = "gluten" />
                              Gluten
					</label>
                         
					<label for = "grain"> 
						<input type="checkbox" name = "grain"/>
                              Grain 
					</label>
                         
					<label for = "peanut"> 
						<input type="checkbox" name = "peanut"/>
                              Peanut
					</label>
                         
					<label for = "seafood"> 
						<input type="checkbox" name = "seafood" />
                              Seafood
					</label>

					<label for = "sesame"> 
						<input type="checkbox" name = "Sesame" />
                              Sesame
					</label>
                         
					<label for = "shellfish"> 
						<input type="checkbox" name = "shellfish"/>
                              Shellfish
					</label>
                         
					<label for = "soy"> 
						<input type="checkbox" name = "soy" />
                              Soy
					</label>
                         
					<label for = "sulfite"> 
						<input type="checkbox" name = "sulfite"/>
                              Sulfite 
					</label>
                         
					<label for = "Tree Nut"> 
						<input type="checkbox" name = "Tree Nut"/>
                              Tree Nut
					</label>
                         
					<label for = "wheat"> 
						<input type="checkbox" name = "wheat" />
                              Wheat
					</label>

				</div>
                    
				<br/>
				<input type = "submit" value = "Save"/>
                    
			</form>
                                   
		</Collapsible>
	);
}

export default SurveyForm;