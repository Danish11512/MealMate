import React, { useEffect, useState } from "react"
import "../../pages/CalendarPage/CalendarPage.css"

const CalendarMeal = async (props) =>{
    const [meal, setMeal] = useState([])


    return(
        <div className="card">
            <div className="card-content">
                <div className="modal">
                    <div className="modal-content">
                    </div>
                    <div className="modal-content">
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CalendarMeal