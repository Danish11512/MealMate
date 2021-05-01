import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"

const CalendarMeal = async (key, props) =>{
    let mealId = null
    let date = null
    let recipeId = null
    let recipeName = null
    let time = null

    useEffect(() => {
        mealId = key.mealId
        date = props.date
        recipeId = props.recipeId
        recipeName = props.recipeName
        time = props.time
        
    }, [props, key])
    

    return(
        // <div className="card">
        //     <div className="card-content">
        //         <div className="modal">
        //             <div className="modal-content">
        //             <p className="has-text-black">hi</p>
        //             </div>
        //             <div className="modal-content">
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            hi
        </div>
    )

}

export default CalendarMeal