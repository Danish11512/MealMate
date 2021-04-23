import React, { useState, useEffect } from "react";
import "./CalendarPage.css";
import CalendarView from '../../components/CalendarComponent/CalendarView'

const CalendarPage = (props) =>{
    const [calendarId, setCalendarId] = useState(props.currentUser.calendarId)
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        setStartDate(startDate)
        
    }, [startDate])


    function decreaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-5))
    }

    function increaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }

    return (
        <div className="columns">
            <div id="list" className="column is-2 has-background-dark">
                style for side component 
            </div>
            <div className="column">
                <div className="column">
                    <h1 className="has-text-centered">Meal Plan</h1>
                </div>
                <div id="calendar" className="columns">
                    <div id="button-left" className="column is-narrow has-background-light">
                        <button onClick={e => decreaseDate(e)}> back </button>
                    </div>
                    <div className="column is-10.5">
                         <CalendarView calendarId = {calendarId} startDate={startDate}></CalendarView>
                    </div>
                    <div id="button-right" className="column is-narrow has-background-light">
                        <button onClick={e => increaseDate(e)}> forward </button>
                    </div>
                </div>

                
                
                
			</div>
		</div>


	);
};

export default CalendarPage;