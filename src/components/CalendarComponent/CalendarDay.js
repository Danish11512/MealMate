import React, { Fragment, useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'
import ReactScrollableList from 'react-scrollable-list'

const CalendarDay = (props) =>{
    let dayInfo = null
    let meals = []
    const [mealContainer, setMealContainer] = useState([])
    const [totalCalories, setTotalCalories] = useState(0)
    const [date, setDate] = useState("")

    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null){
            setDate("")
            setTotalCalories(0)
            meals = []
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push( <CalendarMeal meal = {i}/>))
            console.log(meals)
        }

        if(meals.length == 0){
            setMealContainer([{
                id:1, 
                content: <div>
                            <div className="p-5"></div>
                                <p className="has-text-black has-text-centered">
                                    No Meals for this day &#129368;
                                </p>
                                <div className="p-6"></div>
                        </div>
            }])
        }else{
            let tempMealsContainer = []
            for(let i = 0; i <meals.length; i++){
                tempMealsContainer.push({
                    id: i, 
                    content: meals[i]
                })
            }
            setMealContainer(tempMealsContainer)
        }
    }, [props.dayInfo])

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
                {/* <ul> */}
                    {/* {mealContainer} */}
                {/* {meals.map(meal => (
                        <li><CalendarMeal meal={meal}></CalendarMeal></li>
                    ))} */}
                    
                {/* </ul> */}
                    <div className="p-5"></div>
                    <ReactScrollableList
                        listItems={mealContainer}
                        heightOfItem={1}
                        maxItemsToRender={2}/>
                    <div className="p-5"></div>
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