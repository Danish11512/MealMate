import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"
import * as firebase from "../../firebase/firebase.utils"

const CalendarRecentRecipe = (props) =>{
    const [recipeId, setRecipeId] = useState(props.recipeId)
    const [recipe, setRecipe] = useState([])
    const [modal, setModal] = useState("")
    const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
	const [timeValue, setTimeValue] = useState("");

    useEffect(() => {
        setRecipeId(props.recipeId)
        

        const getRecipeData = async () =>{
            let recipeData = await firebase.getRecipe(`${recipeId}`)
            setRecipe(recipeData)
        }
        getRecipeData()

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

    const handleAdd = async (e) =>
	{
		e.preventDefault()
		let date = new Date(dateValue.replace('-', '/')).toDateString()
		await firebase.addMealToDay(props.currentUser, recipeId, recipe.title, date, timeValue)
        props.addRecipeRefresh()
        closeModal()
	}

    return(
        <div>
            <div onClick={openModal} className="box has-background-light">
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

                                    <form onSubmit={(e) => handleAdd(e)}>
                                            Date: <input className="input is-warning" type="date" name="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} required/> <br/> <br />
                                            Time: <input className="input is-warning" type="time" name="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} required/> <br/> <br />
                                            <button type="submit" className="button is-success">Add</button>
                                    </form>
                                    
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