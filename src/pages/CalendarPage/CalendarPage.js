import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import "./CalendarPage.css";
import CalendarView from '../../components/CalendarComponent/CalendarView'

const CalendarPage = (props) =>{
    const [calendarId, setCalendarId] = useState(props.currentUser.calendarId);
    const [startDate, setStartDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 5));
    let calendarInfo = {}

    useEffect(() => {
        // async function getCalendarInfo(){
        //     calendarInfo = await firebase.getCalendarDateRange(calendarId, startDate, nextDate)
        // }
        // getCalendarInfo()

        // console.log(calendarInfo)
        // setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }, [startDate])

    function decreaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-5))
        setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }

    function increaseDate(event){
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
        setNextDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+5))
    }

    return (
        <div className="columns">
            <div id="list" className="column is-2 has-background-dark">
                style for side component 
            </div>
            <div className="column has-background-primary">
                <div className="column has-background-warning">
                    <h1 className="has-text-centered">Meal Plan</h1>
                </div>
                <div id="calendar" className="columns has-background-danger">
                    <div id="button-left" className="column is-narrow has-background-light">
                        <button onClick={e => decreaseDate(e)}> back </button>
                    </div>
                    <div className="column is-10.5">
                        {nextDate.toString()}
                        <br></br>
                        <br></br>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                         <CalendarView calenderinfo={calendarInfo}></CalendarView>
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