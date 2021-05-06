import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'

const CalendarDay = (props) =>{
    let dayInfo = null
    let meals = []
    let height = 150
    let width = 350
    const [itemSize, setItemSize] = useState(100)
    const [itemCount, setItemCount] = useState(1)
    const [mealContainer, setMealContainer] = useState()
    const [totalCalories, setTotalCalories] = useState(0)
    const [date, setDate] = useState("")
    const [row, setRow] = useState([<p className="has-text-black has-text-centered py-6">No Meals for this day &#129368;</p>])

    const convertDate = (date) =>{
        let tempDate = new Date(date)
        return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()+1).toDateString()
    }

    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null || dayInfo[1].meals.length == 0){

            if(dayInfo != null){
                setDate(convertDate(dayInfo[0]))
            }else{
                setDate("")
            }
            
            setTotalCalories(0)
            setItemSize(100)
            setItemCount(1)
            setRow([<div><div className="p-5"></div><p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p><div className="p-5"></div></div>])
            
        }else{
            setDate(convertDate(dayInfo[0]))
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push(<CalendarMeal meal = {i}/>))
            setItemSize(50)
            setItemCount(meals.length)
            setRow(meals)


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
                    <nav>
                        <ul>
                            {row.map(item => <li>{item}</li>)}
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