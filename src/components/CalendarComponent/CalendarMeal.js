import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
	const [mealId, setMealId] = useState(props.meal.mealId)
	const [date, setDate] = useState(props.meal.date)
	const [recipeId, setRecipeId] = useState(props.meal.recipeId)
	const [recipeName, setRecipeName] = useState(props.meal.recipeName)
	const [time, setTime] = useState(props.meal.time)
	let recipeData = null

    useEffect(() => {
        setMealId(props.meal.mealId)
        setDate(props.meal.date)
		setRecipeId(props.meal.recipeId)
        setRecipeName(props.meal.recipeName)
        setTime(props.meal.time)

		const getRecipeData = async () =>{
			recipeData = await firebase.getRecipeFromDatabase(recipeId).then(console.log(recipeData))
		}

		getRecipeData()
		
        
    }, [props.meal])

    return(
        <div>
            <div className="box py-3">
                <div>
                    <div className="has-text-left">{recipeName}</div>
                    <div className="has-text-right">{time}</div>
                </div>
			</div>
			
        </div>  
    )

}

export default CalendarMeal