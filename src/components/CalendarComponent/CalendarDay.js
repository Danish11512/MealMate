import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import CalendarMeal from './CalendarMeal'
import { FixedSizeList as List } from 'react-window';

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

    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null || dayInfo[1].meals.length == 0){
            setDate("")
            setTotalCalories(0)
            setItemSize(100)
            setItemCount(1)
            setRow([<p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p>])
            
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push( <CalendarMeal meal = {i}/>))
            setItemSize(50)
            setItemCount(meals.length)
            setRow(meals)

        }

        // if(meals.length == 0){
        //     setMealContainer([{
        //         id:1, 
                // content: <div>
                            // <div className="p-5"></div>
                            //     <p className="has-text-black has-text-centered">
                            //         No Meals for this day &#129368;
                            //     </p>
                            //     <div className="p-6"></div>
                //         </div>
        //     }])
        // }else{
        //     let tempMealsContainer = []
        //     for(let i = 0; i <meals.length; i++){
        //         tempMealsContainer.push({
        //             id: i, 
        //             content: meals[i]
        //         })
        //     }
        //     setMealContainer(tempMealsContainer)
        // }


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
                    {/* <div className="p-5"></div>
                    <ReactScrollableList
                        listItems={mealContainer}
                        heightOfItem={1}
                        maxItemsToRender={2}/>
                    <div className="p-5"></div> */}

                    <List
                        height={height}
                        itemCount={itemCount}
                        itemSize={itemSize}
                        width={width}>
                            {({ index, style }) => (
                            <div style={style}>{row[index]}</div>)}
                    </List>
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