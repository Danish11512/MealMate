import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
	const [modal, setModal] = useState("")
	const [recipe, setRecipe] = useState([])
    const [dateValue, setDateValue] = useState(new Date(props.date).toISOString().slice(0, 10));
	const [timeValue, setTimeValue] = useState(props.meal.time);

	const formatTime = (dateString) => {
		let date = new Date("1970-01-01 " + dateString)

		let hh = date.getHours();
		let mm = date.getMinutes();
		let dd = "AM";

		if (hh >= 12) {
			hh -= 12;
			dd = "PM";
		}
		if (hh == 0) {
			hh = 12;
		}

		mm = mm < 10 ? "0" + mm : mm;
		hh = hh < 10 ? "0" + hh : hh; 

		return hh + ":" + mm + dd;
	}
	useEffect(() => {

		const getRecipeData = async () =>{
			let recipeData = await firebase.getRecipe(`${props.meal.recipeId}`)
			setRecipe(recipeData)
		}
		getRecipeData()
		
	}, [props.meal])

	const openModal = () =>{
		if(modal === "")
			setModal("is-active")
		else
			setModal("")
	}

	const closeModal = () =>{
		if(modal === "is-active")
			setModal("")
	}

    const handleEdit = async (e) =>
	{
		e.preventDefault()
		let date = new Date(dateValue.replace('-', '/')).toDateString()
        await props.editMeal(props.meal.mealId, props.date, date, timeValue)
	}
	return(
		<div>
			<div onClick={openModal} className="box">
				<div>
					<div className="has-text-left">{props.meal.recipeName}</div>
					<div className="has-text-right">{formatTime(props.meal.time)}</div>
				</div>
			</div>

			<div className={`modal ${modal}`}>
				<div onClick={closeModal} className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className="columns">
                            <div className="column">
                                <img src={recipe.image} alt="Image"></img>
                            </div>
                            <div className="column is-6">
                                <h3>{props.meal.recipeName}</h3>
                                <h5>{formatTime(props.meal.time)}</h5>
                                <p id="modal-text">	
                                    <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>
                                </p>
                                <div className="update-date-time">
                                    Date: <input type="date" id="date" name="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} required/> <br/>
                                    Time: <input type="time" id="time" name="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleEdit} className="button is-success">Update</button>
                        <button onClick={e => props.removeRecipe(props.meal.mealId, props.date)} className="button is-danger">Remove</button>
                    </footer>
                </div>
			</div>
			
		</div>  
	)

}

export default CalendarMeal