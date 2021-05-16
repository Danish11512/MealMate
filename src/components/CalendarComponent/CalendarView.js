import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import CalendarDay from './CalendarDay'
import "../../pages/CalendarPage/CalendarPage.css";

const CalenderView = (props) =>{
	const [calendarDays, setCalendarDays] = useState(null)
	let endDate = new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate() + 5)
    
	useEffect(() => 
	{ 
		getCalenderInfo()
	} ,[props.startDate])

	const getCalenderInfo = async () => {
		let calendarInfo = await firebase.getCalendarDateRange(props.calendarId, props.startDate, endDate)
		setCalendarDays(null);
		setCalendarDays(Object.keys(calendarInfo).map(k=> [k, calendarInfo[k]]))
	}

	if(!calendarDays)
		return null;
	console.log(calendarDays)
	return(
		<div className="calendar-days">
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[0]} updateCalendar = {getCalenderInfo}></CalendarDay>
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[1]} updateCalendar = {getCalenderInfo}></CalendarDay>
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[2]} updateCalendar = {getCalenderInfo}></CalendarDay>
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[3]} updateCalendar = {getCalenderInfo}></CalendarDay>
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[4]} updateCalendar = {getCalenderInfo}></CalendarDay>
			<CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[5]} updateCalendar = {getCalenderInfo}></CalendarDay>
		</div>
	)
}

export default CalenderView;