import React, { useState } from "react";
import "./CalendarPage.css";
import CalendarView from '../../components/CalendarComponent/CalendarView'

const CalendarPage = (props) =>{
    const [startDate, setStartDate] = useState(new Date())
    const calendarId = props.currentUser.calendarId

    function decreaseDate(){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-6))
    }

    function increaseDate(){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+6))
    }


    return (
        <div className="columns">
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