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
    const [modal, setModal] = useState("")

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

    const openModal = () =>{
        if(modal === "")
			setModal("is-active")
		else
			setModal("")
    }

    const closeModal = () =>{
        if(modal === "is-active")
            setModal("")
    }

    return(
        <div>
            <div onClick={openModal} className="box">
                <div>
                    <div className="has-text-left">{recipeName}</div>
                    <div className="has-text-right">{time}</div>
                </div>
			</div>

            <div className={`modal ${modal}`}>
                <div onClick={closeModal} className="modal-background"></div>
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
            </div>
            
        </div>  
    )

}

export default CalendarMeal