import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import CalendarDay from './CalendarDay'
import "../../pages/CalendarPage/CalendarPage.css";

const CalenderView = (props) =>{
    const [nextDate, setNextDate] = useState(new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate() + 5))
    const [calendarInfo, setCalendarInfo] = useState({})
    const [calendarDays, setCalendarDays] = useState()

    useEffect(() => {
        setNextDate(new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate() + 5))

        const getCalenderInfo = async () => {
            setCalendarInfo(await firebase.getCalendarDateRange(props.calendarId, props.startDate, nextDate))
        }
        getCalenderInfo()

        setCalendarDays(Object.keys(calendarInfo).map(k=> [k, calendarInfo[k]]));
        

    } ,[props.startDate])

    // console.log(calendarDays[0])
    return(
        <div className="columns">
            <div className="column is-4">
                <CalendarDay dayInfo={calendarDays[0]}></CalendarDay>
                <CalendarDay dayInfo={calendarDays[1]}></CalendarDay>
            </div>
            <div className="column is-4">
                <CalendarDay dayInfo={calendarDays[2]}></CalendarDay>
                <CalendarDay dayInfo={calendarDays[3]}></CalendarDay>
            </div>
            <div className="column is-4">
                <CalendarDay dayInfo={calendarDays[4]}></CalendarDay>
                <CalendarDay dayInfo={calendarDays[5]}></CalendarDay>
            </div>
        </div>
    )
}

export default CalenderView;