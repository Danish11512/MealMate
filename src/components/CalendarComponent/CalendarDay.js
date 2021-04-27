import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'

const CalendarDay = (props) =>{
    let dayInfo = null
    const [mealContainer, setMealContainer] = useState(null)
    const [meals, setMeals] = useState([])
    const [totalCalories, setTotalCalories] = useState(0)
    const [date, setDate] = useState("")


    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null){
            setDate("")
            setTotalCalories(0)
            setMeals([])
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            setMeals(dayInfo[1].meals)
        }

        if(meals.length == 0){
            setMealContainer(
                <div>
                    <br></br>
                    <br></br>
                    <p className="has-text-black">
                        No Meals for this day &#128577;
                    </p>
                    <br></br>
                    <br></br>
                </div>
            )
        }else{
            meals.forEach(i => setMealContainer(mealContainer + <CalendarMeal meal={i}></CalendarMeal>))
        }
        
    }, [props.dayInfo])

    return(
        <div>
        <div className="card mb-6">
            <header className="card-header">
                <p className="card-header-title">
                {date}
                </p>
            </header>

            <div className="card-content">
                <div className="content">
                    {mealContainer}
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