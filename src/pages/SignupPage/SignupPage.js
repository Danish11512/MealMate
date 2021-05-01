import React, { useState } from 'react';
import "./SignupPage.css";
import SignupFormComponent from '../../components/SignupFormComponent/SignupFormComponent';
import side_pic from "../../assets/image 6.png";;


const SignupPage = (props) =>{
    return (
        <div className='form-container'>
            <div className="form-content-left">
                <img src= {side_pic} alt="too_much" className="form-img" />
            </div>
            <SignupFormComponent />
        </div>
        
    );
};

export default SignupPage;