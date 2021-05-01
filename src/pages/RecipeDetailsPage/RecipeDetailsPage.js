import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getRecipe, addMealToDay } from '../../firebase/firebase.utils';
import ReactHtmlParser from 'react-html-parser';

import './RecipeDetailsPage.css';

const RecipeDetailsPage = (props) =>
{
    const [recipe, setRecipe] = useState(null)
    const [modalClass, setModalClass] = useState("");
    const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
    const [timeValue, setTimeValue] = useState(null);

    useEffect(() =>{
        const initialize = async () =>
        {
            setRecipe(await getRecipe(props.match.params.id));
        }

        initialize()
    }, [props.match.params.id]);

    const toggleModal = () =>
    {
        if(modalClass === "")
            setModalClass("is-active")
        else
            setModalClass("")
        
    }

    console.log(recipe);
    if(!recipe || !props.currentUser)
        return null;
    
    return(
        <div className="recipe-details">
            <div className="recipe-details-left-panel">
                <img src={recipe.image} alt={recipe.title}/>
            </div>
            <div className="recipe-details-right-panel">
                <h1>{recipe.title}</h1>
                <p>
                    { ReactHtmlParser(recipe.summary)}
                </p>
                <button onClick={toggleModal}>Add to Calendar</button>
            </div>

            <div className={`modal ${modalClass}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add to Calendar</p>
                        <button className="delete" aria-label="close" onClick={toggleModal}></button>
                    </header>
                    <section className="modal-card-body">
                        Date: <input type="date" id="date" name="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} required/> <br/> <br />
                        Time: <input type="time" id="time" name="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} required/>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick = {() => {addMealToDay(props.currentUser.calendarId, recipe.id, recipe.title, dateValue, timeValue); toggleModal()}}>Add</button>
                        <button className="button" onClick={toggleModal}>Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RecipeDetailsPage);