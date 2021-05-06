import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
	// const [mealId, setMealId] = useState(props.meal.mealId)
	// const [date, setDate] = useState(props.meal.date)
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
        // setMealId(props.meal.mealId)
        // setDate(props.meal.date)
		setRecipeId(props.meal.recipeId)
        setRecipeName(props.meal.recipeName)
        setTime(formatTime(props.meal.time))

        const getRecipeData = async () =>{
            let recipeData = await firebase.getRecipe(`${recipeId}`)
            setRecipe(recipeData)
            console.log(recipe)
        }
        getRecipeData()

        // getRecipeData().then(console.log(recipe))
        // const initialize = async () =>
		// {
		// 	setRecipe(await firebase.getRecipe(recipeId));
		// }

		// initialize()
        // console.log(recipe)
        
		
		
        
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

    const recipeDefault = (element) =>{
        if (recipe == null){
            return ""
        }else{
            return recipe.element
        }
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
                                <figure className="image is-128x128">
                                    <img src={recipe.image} alt="Image"></img>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content">
                                    <h3>{recipeName}</h3>
                                    <h5>{time}</h5>
                                    <p>	
                                        <a>{recipe.sourceUrl}</a>
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