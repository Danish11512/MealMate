import React, { useState, useEffect } from "react";
import "./CalendarPage.css";
import CalendarView from '../../components/CalendarComponent/CalendarView'

const CalendarPage = (props) =>{
    const [startDate, setStartDate] = useState(new Date())
    const calendarId = props.currentUser.calendarId
    const previousRecipesArray = props.currentUser.previousRecipes
    const [previousRecipes, setPreviousRecipes] = useState(null)

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
            setPreviousRecipes()
        }

    }, [startDate])


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
                <div className="card">
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
                <div className="card">
                    <div className="card-content">
                        {previousRecipes}
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="column">
                    <h1 className="has-text-centered">Meal Plan</h1>
                </div>
                <div id="calendar" className="columns">
                    <div id="button-left" className="column is-narrow has-background-light">
                        <button onClick={e => decreaseDate(e)}> &#8592; </button>
                    </div>
                    <div className="column is-10.5">
                         <CalendarView calendarId = {calendarId} startDate={startDate}></CalendarView>
                    </div>
                    <div id="button-right" className="column is-narrow has-background-light">
                        <button onClick={e => increaseDate(e)}> &#8594; </button>
                    </div>
                </div>

                
                
                
            </div>
        </div>


    );
};

export default CalendarPage;