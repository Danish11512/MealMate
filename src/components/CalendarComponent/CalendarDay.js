import React, { useEffect, useState } from "react";
import * as firebase from '../../firebase/firebase.utils';
import "../../pages/CalendarPage/CalendarPage.css";

const CalendarDay = (props) =>{
    const [dayInfo, setDayInfo] = useState(props.dayInfo)

    useEffect(() => {
        setDayInfo(props.dayInfo)

        
    }, [props.dayInfo])

    console.log(dayInfo)




    return(
        <div className="">
        </div>
    )
}
export default CalendarDay