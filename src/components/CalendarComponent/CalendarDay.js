import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'

const CalendarDay = (props) =>{
    const [dayInfo, setDayInfo] = useState(props.dayInfo)
    const [meals, setMeals] = useState([])
    const [totalCalories, seTotalCalories] = useState(0)
    const [day, setDay] = useState("")

    useEffect(() => {
        // const getDayInfo = async () => {
        //     setDayInfo(await props.dayInfo)
        // }
        // getDayInfo().then(console.log(dayInfo))
        //             // .then(setDay(dayInfo[0]))
        //             .then(setMeals[1])
            

        
        
        // const getMeals = async () =>{
        //     setMeals(await dayInfo[1])
        // }

        // getMeals()
        
        
        
    }, [props.dayInfo])

    return(
        <div>
        <div className="card mb-6">
            <header className="card-header">
                <p className="card-header-title">
                Date
                </p>
            </header>

            <div className="card-content">
                <div className="content">
                    Meal
                    <br></br>
                    meal
                    <br></br>
                    Meal
                    {/* <CalendarMeal></CalendarMeal> */}
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