import React from 'react';
import "./LoginPage.css";
import LoginFormComponent from '../../components/LoginFormComponent/LoginFormComponent';
import side_pic from "../../assets/image 5.png";

const LoginPage = (props) =>{
    return (
        <div className='form-container'>
            <div className="form-content-left">
                <img src= {side_pic} alt="too_much" className="form-img" />
            </div>
            <LoginFormComponent />
        </div>
        
    );
};

export default LoginPage;