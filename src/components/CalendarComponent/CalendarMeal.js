import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
    // let mealId = props.mealId | null
    // let date = props.date | null
    // let recipeId = props.recipeId | null
    // let recipeName = props.recipeId | null
    // let time = props.time | null

    // useEffect(() => {
        // mealId = key.mealId
        // date = props.date
        // recipeId = props.recipeId
        // recipeName = props.recipeName
        // time = props.time
        
    // }, [])
    

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