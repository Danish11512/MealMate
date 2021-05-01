import React from 'react';
import "./LandingPage.css";
import side_pic from "../../assets/food.png";

const LandingPage = () =>{
    return (
        <div className="container-1">
            <div className="box-1">
                <img src= {side_pic} alt="yum" className="box-img" />
            </div>
            <div className="box-2">
                <h3 className="chef">Be your chef and</h3>
                <h3 className="hit">hit the kitchen</h3>
                <p className="access1">Get access to over thousands of recipies</p> 
                <p className="access2">for free!</p>
                {/* <button className="button-is-primary">Join Now</button> */}
                <a className="button is-primary is-large myButton">Join Now</a>
            </div>
        </div>
    );
};

export default LandingPage;