import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
	const [mealId, setMealId] = useState(props.meal.mealId)
	const [recipeId, setRecipeId] = useState(props.meal.recipeId)
	const [recipeName, setRecipeName] = useState(props.meal.recipeName)
	const [time, setTime] = useState(props.meal.time)
    const [modal, setModal] = useState("")
    const [recipe, setRecipe] = useState([])


    const formatTime = (dateString) => {
        let date = new Date("1970-01-01 " + dateString)

        let hh = date.getHours();
        let mm = date.getMinutes();
        let dd = "AM";

        if (hh >= 12) {
            hh -= 12;
            dd = "PM";
        }
        if (hh == 0) {
            hh = 12;
        }

        mm = mm < 10 ? "0" + mm : mm;
        hh = hh < 10 ? "0" + hh : hh; 

        return hh + ":" + mm + dd;
    }
    useEffect(() => {
        setRecipeId(props.meal.recipeId)
        setRecipeName(props.meal.recipeName)
        setTime(formatTime(props.meal.time))

        const getRecipeData = async () =>{
            let recipeData = await firebase.getRecipe(`${recipeId}`)
            setRecipe(recipeData)
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

    const removeAndClose = (e) =>{
        closeModal()
        props.removeRecipe(e, mealId, props.meal)
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
                    <div className="modal-card">
                        <section className="modal-card-body">
                            <div className="columns">
                                <div className="column">
                                    <img src={recipe.image} alt="Image"></img>
                                </div>
                                <div className="column is-6">
                                    <h3>{recipeName}</h3>
                                    <h5>{time}</h5>
                                    <p id="modal-text">	
                                        <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>
                                    </p>
                                    <button onClick={e => removeAndClose(e)} className="button is-danger">Remove</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        </div>  
    )

}

export default CalendarMeal