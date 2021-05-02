import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import "./CalendarPage.css";

const CalendarPage = (props) =>{
    const [calendarId, setCalendarId] = useState(props.currentUser.calendarId);
    const [startDate, setStartDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 5));
    let calendarInfo = {}

    useEffect(() => {

        
        
        // async function getCalendarInfo(){
        //     calendarInfo = await firebase.getCalendarDateRange(calendarId, startDate, newDate)
        // }

        // console.log(nextDate)
        
        // getCalendarInfo()

        // setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }, [])

    function decreaseDate(event){
        // setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-5))
        // startDate.setDate(startDate.getDate() - 5)
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-5))
        setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))

    }
    function increaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
        setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }

    return (
        <div>
        <div>
            style for side component 
        </div>
        <div>
            <button onClick={e => decreaseDate(e)}> back </button>
            {nextDate.toString()}
            <button onClick={e => increaseDate(e)}> forward </button>
        </div>
        </div>


    );
};

export default CalendarPage;