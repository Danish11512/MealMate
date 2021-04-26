import React from 'react';
import ReactRoundedImage from "react-rounded-image";
import "./ProfilePage.css";
import logo from "../../assets/mealLogo.png";
import { getRecipeById } from "../../spoonacular.utils";
// These imports arent needed
import demonslayer from "../../assets/demonslayer.jpg";
import random from "../../assets/random.jpg";
import unlimitedbladeworks from "../../assets/unlimitedbladeworks.jpg";

const ProfilePage = (props) =>{

    // Random Data to display
    const recipeId = [
        "659463",
        "638626",
        "634873"
    ]

    return (
        <div>

            <div className="top_row" >

                <div className="greeting">
                    <ReactRoundedImage className="img-valign" image= {logo} roundedSize="0" imageWidth="110" imageHeight="110" />
                    <h1 className="username"> Hi, { props.currentUser.displayName }</h1>
                </div>

                <div className="vertical_line"></div>

                <div className="user_info">
                    <pre><strong>Nickname:</strong>   { props.currentUser.displayName }</pre>
                    <br/>
                    <pre><strong>Email:</strong>   { props.currentUser.email }</pre>
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
                    {/* 
                    <img src={demonslayer} alt='random awdwae'></img>
                    <img src={random} alt='random adwa'></img>
                    <img src={unlimitedbladeworks} alt='random adw'></img>
                    */}
                    {recipeId.map((Id) => {
                        return(
                            <h1> {Id} </h1>
                        );
                    })}
                </div>
            </div>

        </div>
    )

}

export default ProfilePage;