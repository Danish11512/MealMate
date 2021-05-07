import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'
import * as firebase from "../../firebase/firebase.utils"

const CalendarDay = (props) =>{
    let dayInfo = null
    let meals = []
    const [totalCalories, setTotalCalories] = useState(0)
    const [date, setDate] = useState("")
    const [row, setRow] = useState([<p className="has-text-black has-text-centered py-6">No Meals for this day &#129368;</p>])

    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null || dayInfo[1].meals.length == 0){

            if(dayInfo != null){
                setDate(dayInfo[0])
            }else{
                setDate("")
            }
            
            setTotalCalories(0)
            setRow([<div><div className="p-5"></div><p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p><div className="p-5"></div></div>])
            
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push(<CalendarMeal removeRecipe={removeRecipe} date={date} meal = {i}/>))
            setRow(meals)


        }
    }, [props.dayInfo])

    const removeRecipe = (event, mealId) =>{

		if(mealId != null && props.calendarId != null ){
            firebase.removeMealFromDay(props.calendarId, mealId, date)
            console.log("done")
        }
		    
    }

    return(
        <div>
        <div className="card mb-6">
            <header className="card-header">
                <p className="card-header-title ">
                {date}
                </p>
            </header>

            <div className="card-content">
                <div className="content">
                    <nav>
                        <ul>
                            {row.map(item => <li key={row.indexOf(item)}>{item}</li>)}
                        </ul>
                    </nav>
                </div>
              
            </div>

            <footer className="card-footer">
                Total Calories: {totalCalories}
            </footer>
        </div>
        </div>
    )
}
export default CalendarDay