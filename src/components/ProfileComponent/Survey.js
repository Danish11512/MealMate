import React, { useState } from "react";
import "./Survey.css";
import Modal from './Modal';
import { SurveyPage } from '../../pages/SurveyPage/SurveyPage';
import { changeSurveyAnswers } from '../../firebase/firebase.utils';


function handleSubmit(e) {
	alert('Submitted Survey Response');
	e.preventDefault();
}




class SurveyForm extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
		  modalState: false
		};
		
		this.toggleModal = this.toggleModal.bind(this);
	  }
	  
	  toggleModal() {    
		this.setState((prev, props) => {
		  const newState = !prev.modalState;
		  
		  return { modalState: newState };
		});
	  }

	  render(){
		  return (
			  <div>
				<a className="button is-primary" onClick={this.toggleModal}>
					Review Survey Information
				</a>

				<Modal 
					closeModal = { this.toggleModal } 
					modalState = { this.state.modalState } 
					title = 'Review Survey Information'
				 >
					
					<br/>
					<form onSubmit={handleSubmit}>
								
						<div className = "survey_diet">
								
							<h1>Diet Types</h1>
							<br/>
							<label for = "gluten_free"> 
								<input type="radio" value = "gluten_free" name = 'diet'/>
									Gluten Free 
							</label>

							<label for = "ketogenic"> 
								<input type="radio" value = "ketogenic" name = 'diet'/>
									Ketogenic 
							</label>
								
							<label for = "vegetarian"> 
								<input type="radio" value = "vegetarian" name = 'diet'/>
									Vegetarian 
							</label>

							<label for = "vegan"> 
								<input type="radio" value = "vegan" name = 'diet'/>
									Vegan 
							</label>
								
							<label for = "pescetarian"> 
								<input type="radio" value = "pescetarian" name = 'diet'/>
									Pescetarian 
							</label>

							<label for = "paleo"> 
								<input type="radio" value = "paleo" name = 'diet'/>
									Paleo 
							</label>
							<label for = "none"> 
								<input type="radio" value = "none" name = 'diet'/>
									None
							</label>
						</div>
							
						<div className = "survey_intolerances">

							<br/>
							<h1>Intolerances</h1>
							<br/>

							<label for = "dairy"> 
								<input type="checkbox" value = "dairy" />
									Dairy
							</label>
								
							<label for = "egg"> 
								<input type="checkbox" value = "egg"/>
									Egg
							</label>

							<label for = "gluten"> 
								<input type="checkbox" value = "gluten" />
									Gluten
							</label>
								
							<label for = "grain"> 
								<input type="checkbox" value = "grain"/>
									Grain 
							</label>
								
							<label for = "peanut"> 
								<input type="checkbox" value = "peanut"/>
									Peanut
							</label>
								
							<label for = "seafood"> 
								<input type="checkbox" value = "seafood" />
									Seafood
							</label>

							<label for = "sesame"> 
								<input type="checkbox" value = "Sesame" />
									Sesame
							</label>
								
							<label for = "shellfish"> 
								<input type="checkbox" value = "shellfish"/>
									Shellfish
							</label>
								
							<label for = "soy"> 
								<input type="checkbox" value = "soy" />
									Soy
							</label>
								
							<label for = "sulfite"> 
								<input type="checkbox" value = "sulfite"/>
									Sulfite 
							</label>
								
							<label for = "Tree Nut"> 
								<input type="checkbox" value = "Tree Nut"/>
									Tree Nut
							</label>
								
							<label for = "wheat"> 
								<input type="checkbox" value = "wheat" />
									Wheat
							</label>

						</div>
							
						<br/>
						<input type = "submit" value = "Save"/>
							
					</form>
                    
				</Modal>

		   </div>

		  )
	  }
}





export default SurveyForm;