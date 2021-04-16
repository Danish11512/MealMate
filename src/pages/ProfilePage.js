import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReactRoundedImage from "react-rounded-image";
import "../styles/ProfilePage.css";
import logo from "../components/static/mealLogo.png";
import demonslayer from "../components/static/demonslayer.jpg";
import random from "../components/static/random.jpg";
import unlimitedbladeworks from "../components/static/unlimitedbladeworks.jpg";
const ProfilePage = (props) =>{
    // props.currentUser

    return (
        <div>

            <div className="top_row" >

                <div className="greeting">
                    <ReactRoundedImage class="img-valign" image= {logo} roundedSize="0" imageWidth="110" imageHeight="110" />
                    <h1 class="username"> Hi, Farhan </h1>
                </div>

                <div className="vertical_line"></div>

                <div className="user_info">
                    <pre><strong>Nickname:</strong>   BloodStream</pre>
                    <br/>
                    <pre><strong>Email:</strong>   bloodstream@gmail.com</pre>
                    <br/>
                    <a href=""> Change Password</a>
                    <br/>
                    <br/>
                    <a href=""> Review Survey Information </a>
                </div>

            </div>

            <div className="bottom_row">
                <h1><strong>Previous Recipes</strong></h1>
                <br/>
                <div className="previous_recipes">
                    <img src={demonslayer} alt='random awdwae'></img>
                    <img src={random} alt='random adwa'></img>
                    <img src={unlimitedbladeworks} alt='random adw'></img>
                </div>
            </div>

        </div>
    )

}

export default ProfilePage;