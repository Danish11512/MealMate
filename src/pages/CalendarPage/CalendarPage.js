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
		<div>
			<div>
				<div className="column">
					<h1 className="has-text-centered">Meal Plan</h1>
				</div>
				<div id="calendar">
					<div id="button-left">
						<button className="button" onClick={e => decreaseDate(e)}> &#8592; </button>
					</div>
					<div className="calendar-view-container">
						<CalendarView calendarId = {calendarId} startDate={startDate}></CalendarView>
					</div>
					<div id="button-right">
						<button className="button" onClick={e => increaseDate(e)}> &#8594; </button>
					</div>
				</div>
			</div>
		</div>


	);
};

export default CalendarPage;