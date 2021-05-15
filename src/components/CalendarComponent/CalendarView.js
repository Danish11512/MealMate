import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import CalendarDay from './CalendarDay'
import "../../pages/CalendarPage/CalendarPage.css";

const CalenderView = (props) =>{
    const [calendarDays, setCalendarDays] = useState([])
    let endDate = null
    
    useEffect(() => {
        endDate = new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate() + 5)
        
        const getCalenderInfo = async () => {
            let calendarInfo = await firebase.getCalendarDateRange(props.calendarId, props.startDate, endDate)
            setCalendarDays(Object.keys(calendarInfo).map(k=> [k, calendarInfo[k]]))
        }
        
        getCalenderInfo()
        
    } ,[props.startDate])

    return(
        <div className="columns">
            <div className="column is-4">
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[0]}></CalendarDay>
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[1]}></CalendarDay>
            </div>
            <div className="column is-4">
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[2]}></CalendarDay>
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[3]}></CalendarDay>
            </div>
            <div className="column is-4">
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[4]}></CalendarDay>
                <CalendarDay calendarId={props.calendarId} dayInfo={calendarDays[5]}></CalendarDay>
            </div>
        </div>
    )
}

export default CalenderView;