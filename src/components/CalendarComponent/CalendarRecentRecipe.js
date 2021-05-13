import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarRecentRecipe = (props) =>{
    const [recipeId, setRecipeId] = useState(props.recipeId)
    const [recipe, setRecipe] = useState([])
    const [modal, setModal] = useState("")

    useEffect(() => {
        setRecipeId(props.recipeId)
        

        const getRecipeData = async () =>{
            let recipeData = await firebase.getRecipe(`${recipeId}`)
            setRecipe(recipeData)
        }
        getRecipeData()
        console.log(recipe)

    }, [props.recipeId])


    
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
            <div onClick={openModal} className="box has-background-info-light">
                <div className="">{recipe.title}</div>
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
                                    <div className="title is-4">{recipe.title}</div>
                                    <p id="modal-text">	
                                        <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>
                                    </p>
                                    <br></br>
                                    <button className="button is-primary">Add</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        </div>  
    )
}
export default CalendarRecentRecipe