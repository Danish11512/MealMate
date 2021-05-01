import React, { useState, useEffect } from 'react';
import ReactRoundedImage from "react-rounded-image";
import "./ProfilePage.css";
import logo from "../../assets/mealLogo.png";
import { getRecipeById } from "../../spoonacular.utils";
import SurveyForm  from "../../components/ProfileComponent/Survey";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// These imports arent needed
import demonslayer from "../../assets/demonslayer.jpg";
import random from "../../assets/random.jpg";
import unlimitedbladeworks from "../../assets/unlimitedbladeworks.jpg";

const ProfilePage = (props) =>{
    const [recipes, setRecipes] = useState([]);

     // Random Data to display
     const recipeId = [
        "659463",
        "638626",
        "634873"
    ]

    const recipeObject = []

    const fetchData = async () => {
        for(const [index, value] of recipeId.entries()){
            console.log(value)
            let queryString = `https://api.spoonacular.com/recipes/${value}/information?apiKey=baa7a2e369eb42599d83a5e79692bb15`;
            let response = await fetch(queryString, { method: "GET" });

            let response_json = await response.json(); // Doesn't return json object, returns js object

            console.log("this is the id of recipe",response_json.id)
            console.log("this is the image url  of recipe",response_json.image)
            recipeObject.push(response_json)
            setRecipes(recipes => [...recipes,response_json]);
        }
        console.log(recipeObject)
    };

    function ChangePassword(e){
        e.preventDefault();
        var auth = firebase.auth();
        var emailAddress = props.currentUser.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        // console.log("Email has been sent")
        alert("Password reset link has been sent to your email!")
        }).catch(function(error) {
        // An error happened.
        alert("Here is the error that occured:" + error)
        });
    }
   

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
                    {/* <a href=""> Change Password</a> */}
                    <button onClick={ChangePassword}>Change Password</button>
                    {/* 
                    var auth = firebase.auth();
                    var emailAddress = "user@example.com";

                    auth.sendPasswordResetEmail(emailAddress).then(function() {
                    // Email sent.
                    }).catch(function(error) {
                    // An error happened.
                    });

                    */}

                    <br/>
                    <br/>

                    <SurveyForm/>
                </div>

            </div>

            <div className="bottom_row">
                <h1><strong>Previous Recipes</strong></h1>
                <button onClick={fetchData}>Get Recipes</button>
                <br/>
                <div className="previous_recipes">
                    {/* 
                    <img src={demonslayer} alt='random awdwae'></img>
                    <img src={random} alt='random adwa'></img>
                    <img src={unlimitedbladeworks} alt='random adw'></img>
                    

                    {recipeId.length > 0 ? (
                        recipeId.map((Id) => {
                            
                            return(
                                <div>
                                    <h1> {Id} </h1>
                                    <img src ={ recipeId.image }></img>
                                </div>
                            );
                        })
                        ) : (
                        <p>"No previous recipes"</p>
                        )}
                    */}

                    

                    {recipes.map((el) => {
                        return(
                            <div>
                                <h1> {el.id} </h1>
                                <img src = { el.image } ></img>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )

}

export default ProfilePage;