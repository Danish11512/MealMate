import React from 'react';
import "./LoginPage.css";
import side_pic from "../../assets/image 5.png";
import LoginFormComponent from '../../components/LoginFormComponent/LoginFormComponent';

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