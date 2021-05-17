import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'
import * as firebase from "../../firebase/firebase.utils"

const CalendarDay = (props) =>{
	const [row, setRow] = useState([<p className="has-text-black has-text-centered py-6">No Meals for this day &#129368;</p>])

	useEffect(() => {
		let meals = []
		let dayInfo = props.dayInfo
		if (dayInfo && dayInfo[1].meals.length === 0){
			setRow([<div><div className="p-5"></div><p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p><div className="p-5"></div></div>])
		}else{
			let sortedDayMeals = dayInfo[1].meals
			sortedDayMeals.sort((a,b) => (a.time > b.time) ? 1 : -1)
            
			sortedDayMeals.forEach(i => meals.push(<CalendarMeal removeRecipe={removeRecipe} editMeal={editMeal} date={dayInfo[0]} meal = {i}/>))
			setRow(meals)
		}
	}, [])

	const removeRecipe = async (mealId, date) =>{
		if(mealId != null && props.calendarId != null ){
			await firebase.removeMealFromDay(props.calendarId, mealId, date)
			props.updateCalendar()
		}
			
	}

	const editMeal = async (mealId, date, newDate, newTime) =>{
		if(mealId != null && props.calendarId != null ){
			await firebase.editMealInDay(props.calendarId, mealId, date, newDate, newTime)
			props.updateCalendar()
		}
			
	}

	if(!props.dayInfo)
		return null;

	return(
		<div>
			<div className="card mb-6">
				<header className="card-header">
					<p className="card-header-title ">
						{props.dayInfo[0]}
					</p>
				</header>

				<div className="card-content" style={{height:"250px", overflowY:"auto"}}>
					<div className="content" >
						{row.map(item => <span key={row.indexOf(item)}>{item}</span>)}
					</div>
				</div>

				<footer className="card-footer">
				Total Calories: {props.dayInfo[1].totalCalories}
				</footer>
			</div>
		</div>
	)
}
export default CalendarDay