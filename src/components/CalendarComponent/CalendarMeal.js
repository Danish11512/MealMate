import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarMeal = (props) =>{
    let mealId = props.meal.mealId
    let date = props.meal.date
    let recipeId = props.meal.recipeId
    let recipeName = props.meal.recipeName
    let time = props.meal.time

    useEffect(() => {
        mealId = props.meal.mealId
        date = props.meal.date
        recipeId = props.meal.recipeId
        recipeName = props.meal.recipeName
        time = props.meal.time


		const mealBox = document.querySelector(".box")
		const modal = document.querySelector(".modal")
		const modalBg = document.querySelector(".modal-background")

		mealBox.addEventListener("click", () => {
			modal.classList.add("is-active")
		})

		modalBg.addEventListener("click", () => {
			modal.classList.remove("is-active")
		})
        
    }, [props])
    


	



    return(
        <div>
            <div className="box">
                <div>
                    <div className="has-text-left">{recipeName}</div>
                    <div className="has-text-right">{time}</div>
                </div>
			</div>
			<div className="modal">
				<div className="modal-background"></div>
				<div className="modal-content has-background-white">
					<div class="box">
  						<article class="media">
							<div class="media-left">
								<figure class="image is-256x256">
									<img src="https://bulma.io/images/placeholders/256x256.png" alt="Image"></img>
								</figure>
							</div>
							<div class="media-content">
								<div class="content">
									<p>
										<h3>{recipeName}</h3>
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