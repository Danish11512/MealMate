import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'
import * as firebase from "../../firebase/firebase.utils"

const CalendarDay = (props) =>{
    let dayInfo = null
    let meals = []
    const mealsCopy = Object.assign([], meals)
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
            let sortedDayMeals = dayInfo[1].meals
            sortedDayMeals.sort((a,b) => (a.time > b.time) ? 1 : -1)

            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            getCalories(dayInfo[1].meals)
            sortedDayMeals.forEach(i => meals.push(<CalendarMeal removeRecipe={removeRecipe} date={date} meal={i}/>))
            meals.forEach(i => mealsCopy.push(i))
            setRow(meals)
        }
    }, [props.dayInfo])
    
    const removeRecipe  = async (e, mealId, meal) =>{
		if(mealId != null && props.calendarId != null ){
            if (meals.length > 1){
                let index = 0
                index = meals.map(function(e) { return e.props.meal.mealId }).indexOf(meal.mealId)
                
                // meals.indexOf([meal,<CalendarMeal removeRecipe={removeRecipe} date={date} meal={meal}/>])
                // console.log(meals)
                mealsCopy.splice(index, 1)
                firebase.removeMealFromDay(props.calendarId, mealId, dayInfo[0]).then(setRow(mealsCopy))
                // console.log(dayInfo[1].meals.indexOf(meal))
            }else{
                let index = 0
                index = meals.map(function(e) { return e.props.meal.mealId }).indexOf(meal.mealId)
                
                // meals.indexOf([meal,<CalendarMeal removeRecipe={removeRecipe} date={date} meal={meal}/>])
                // console.log(meals)
                mealsCopy.splice(index, 1)
                firebase.removeMealFromDay(props.calendarId, mealId, dayInfo[0]).then(setRow([<div><div className="p-5"></div><p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p><div className="p-5"></div></div>]))
                // console.log(dayInfo[1].meals.indexOf(meal))
            }
            
        }
		    
    }

    const getCalories = async (meals) => {
        let recipeIds = []
        let recipeSummary = []
        let tempString = ""
        let recipeCalorie = []
        let tempCalorie = 0
        meals.forEach(i => recipeIds.push(i.recipeId))

        for(let i = 0; i< recipeIds.length; i++)
            recipeSummary.push((await firebase.getRecipe(`${recipeIds[i]}`)).summary) 

        try{
            for(let summary = 0; summary < recipeSummary.length; summary ++){
                for(let i = 0; i< recipeSummary[summary].length; i++){
                    if(!isNaN(recipeSummary[summary][i])){
                        tempString += recipeSummary[summary][i]
                        
                    }else if(isNaN(recipeSummary[summary][i])){
                        if(recipeSummary[summary].substring(i, i+8) == "calories"){
                            break
                        }else{
                            tempString = ""
                        }
                    }else{
                        tempString = ""
                    }
                }
                recipeCalorie.push(parseInt(tempString))
            }
        }
        catch(error){
            console.log("Error while parsing summary: ", error.message)
        }
        
        recipeCalorie.forEach(i => tempCalorie += i)
        setTotalCalories(tempCalorie)
        
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
                    <nav id="meal-view">
                        <ul id="meal-list">
                            {row.map((item) => <li key={row.indexOf(item)}>{item}</li>)}
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