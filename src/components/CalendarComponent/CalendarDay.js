import React, { Fragment, useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'

const CalendarDay = (props) =>{
    let dayInfo = null
    let meals = []
    const [mealContainer, setMealContainer] = useState(<div></div>)
    const [totalCalories, setTotalCalories] = useState(0)
    const [date, setDate] = useState("")

    // const assignMeals = () =>{
    //     let html = []

    //     for(let i = 0; i<meals.length; i++){
    //         html.push(<CalendarMeal meal={meals[i]}></CalendarMeal>)
    //     }

    //     return html
    // }

    useEffect(() => {
        dayInfo = props.dayInfo

      
        if (dayInfo == null){
            setDate("")
            setTotalCalories(0)
            meals = []
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push({"recipeName":i.recipeName, 
                                                        "time": i.time, 
                                                        "recipeId": i.recipeId,
                                                        "mealId": i.mealId,
                                                        "date": i.date}))
            // Object.keys(i).map(k => [k, i[k]])
            // meals = dayInfo[1].meals
            console.log(meals)
            // meals.map(k =>(
                // console.log(k.time)
            // ))
        }


        // [
        //     "recipeName",
        //     "sample recipe"
        // ],
        // [
        //     "time",
        //     "3:00pm"
        // ],
        // [
        //     "recipeId",
        //     "gfu5cfmke"
        // ],
        // [
        //     "mealId",
        //     "wysric9hk"
        // ],
        // [
        //     "date",
        //     "Sat May 01 2021"
        // ]

        // if(meals.length == 0){
        //     setMealContainer(
        //         <div>
        //             <br></br>
        //             <br></br>
        //             <p className="has-text-black">
        //                 No Meals for this day &#128577;
        //             </p>
        //             <br></br>
        //             <br></br>
        //         </div>
        //     )
        // }else{

        //     meals.forEach(i => setMealContainer(mealContainer + <CalendarMeal meal={i}></CalendarMeal>))
        //     // setMealContainer(
        //         // <div>
        //         // <Fragment>
        //         //     {meals.map(meal=>(
        //         //         <CalendarMeal key={meal.time}>{meal.recipeName}</CalendarMeal>
        //         //     ))}
        //         //     </Fragment>
        //         // </div>
        //         // <CalendarMeals meals={meals}></CalendarMeals>
        //     // )

        //     setMealContainer(
        //         <div>
        //             {meals.map(meal => {
        //                 <CalendarMeal key={meal.mealId} 
        //                             date={meal.date} 
        //                             recipeId={meal.recipeId} 
        //                             recipeName={meal.recipeName} 
        //                             time = {meal.time}>
        //                 </CalendarMeal>
        //             })}
        //         </div>
        //     )
        // }
        
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
                <ul>
                {meals.map(meal => (
                        <li><CalendarMeal meal={meal}></CalendarMeal></li>
                    ))}
                </ul>
                    
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