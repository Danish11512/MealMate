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
    const [dayNumber, setDayNumber] = useState(props.dayNumber)

    useEffect(() => {
        dayInfo = props.dayInfo

        if (dayInfo == null || dayInfo[1].meals.length == 0){

            if(dayInfo != null){
                setDate(dayInfo[0])    
            }else{
                setDate("")
            }
            
            setTotalCalories(0)
            setItemSize(100)
            setItemCount(1)
            setRow([<div><div className="p-5"></div><p className="has-text-black has-text-centered py-5">No Meals for this day &#129368;</p><div className="p-5"></div></div>])
            console.log(row)
            
        }else{
            setDate(dayInfo[0])
            setTotalCalories(dayInfo[1].totalCalories)
            dayInfo[1].meals.forEach(i => meals.push(<CalendarMeal meal = {i}/>))
            setItemSize(50)
            setItemCount(meals.length)
            setRow(meals)

        }
    }, [props.dayInfo])

    // function openModal(event, meal, index){
    //     if(meal != null){
    //     const mealBox = document.querySelector(".box")
    //     // `.box${index}`
	// 	const modal = document.querySelector(".modal")
	// 	const modalBg = document.querySelector(".modal-background")

	// 	mealBox.addEventListener("click", () => {
	// 		modal.classList.add("is-active")
	// 	})

	// 	modalBg.addEventListener("click", () => {
	// 		modal.classList.remove("is-active")
	// 	})
    //     }
        

    // }

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
                    {/* <List
                        height={height}
                        itemCount={itemCount}
                        itemSize={itemSize}
                        width={width}>
                            {({ index, style }) => (
                            <a style={style}>{row[index]}</a>)}
                    </List> */}
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
{/* 
        <div className="modal">
				<div className="modal-background"></div>
				<div className="modal-content has-background-white">
					<div className="box">
  						<article className="media">
							<div className="media-left">
								<figure className="image is-256x256">
									<img src="https://bulma.io/images/placeholders/256x256.png" alt="Image"></img>
								</figure>
							</div>
							<div className="media-content">
								<div className="content">
									<h3>{recipeName}</h3>
									<h5>{time}</h5>
									<p>	
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
									</p>
								</div>
    						</div>
  						</article>
					</div>
				</div>
			</div> */}
        </div>
    )
}
export default CalendarDay