import React, { useState, useEffect } from "react";
import "./CalendarPage.css";
import CalendarRecentRecipe from '../../components/CalendarComponent/CalendarRecentRecipe'
import CalendarView from '../../components/CalendarComponent/CalendarView'

const CalendarPage = (props) =>{
    const [startDate, setStartDate] = useState(new Date())
    const calendarId = props.currentUser.calendarId
    let previousRecipesArray = props.currentUser.previousRecipes
    const [previousRecipes, setPreviousRecipes] = useState([<div>
        <p className="has-text-black">
            <br></br><br></br><br></br><br></br><br></br>
            Looks like you dont have any recent meals &#129370;
            <br></br><br></br><br></br><br></br><br></br>
        </p>
    </div>])

    useEffect(() => {
        setStartDate(startDate)

        if(previousRecipesArray.length < 1){
            setPreviousRecipes(
                <div>
                    <p className="has-text-black">
                        <br></br><br></br><br></br><br></br><br></br>
                        Looks like you dont have any recent meals &#129370;
                        <br></br><br></br><br></br><br></br><br></br>
                    </p>
                </div>
            )
            
        }else{
            let tempRecipeHolder = []
            previousRecipesArray = previousRecipesArray.slice(1).slice(-5)
            previousRecipesArray.forEach(i => tempRecipeHolder.push(<CalendarRecentRecipe addRecipeRefresh={addRecipeRefresh} currentUser={props.currentUser} recipeId={i}/>))
            setPreviousRecipes(tempRecipeHolder)
        }


    }, [startDate])

    const addRecipeRefresh = () =>{
        const noChangeStartDate = Object.assign(new Date(), startDate)
        setStartDate(noChangeStartDate)
    }

    function decreaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-6))
    }

    function increaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+6))
    }


    return (
        <div className="columns">
            <div id="list" className="column is-2">
            <div className="title is-5 has-text-centered"> Add to Calendar</div>
                <div className="card has-background-warning">
                    <div className="card-content has-text-centered">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="Recipe"></input>
                            </div>
                        </div>
                    <div className="subtitle is-6 has-text-centered"> Satisfy your cravings</div>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    </div>
                </div>
                <br></br>
                <div className="title is-5 has-text-centered"> Your Recent Recipes</div>
                <div className="card has-background-grey-lighter">
                    <div id="recipe-list" className="card-content">
                    <nav>
                        <ul>
                            {previousRecipes.map(item => <li key={previousRecipes.indexOf(item)}>{item}</li>)}
                        </ul>
                    </nav>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column">
                    <h1 className="has-text-centered">Meal Plan</h1>
                </div>
                <div id="calendar" className="columns">
                    <div id="button-left" className="column is-narrow has-background-light">
                        <button className="button" onClick={e => decreaseDate(e)}> &#8592; </button>
                    </div>
                    <div className="column is-10.5">
                         <CalendarView calendarId = {calendarId} startDate={startDate}></CalendarView>
                    </div>
                    <div id="button-right" className="column is-narrow has-background-light">
                        <button className="button" onClick={e => increaseDate(e)}> &#8594; </button>
                    </div>
                </div>

                
                
                
			</div>
		</div>


	);
};

export default CalendarPage;