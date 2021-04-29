import React from 'react';
import ReactRoundedImage from "react-rounded-image";
import Collapsible from 'react-collapsible';
import "./ProfilePage.css";
import logo from "../../assets/mealLogo.png";
import { getRecipeById } from "../../spoonacular.utils";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// These imports arent needed
import demonslayer from "../../assets/demonslayer.jpg";
import random from "../../assets/random.jpg";
import unlimitedbladeworks from "../../assets/unlimitedbladeworks.jpg";

const ProfilePage = (props) =>{
    
    function handleSubmit(e) {
        alert('Submitted Survey Response');
        e.preventDefault();
      }

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

                    <Collapsible trigger = "Review Survey Information" classParentString = "survey_info" >
                       {/* 
                            It should be a dropdown to specify their diet and then a bunch of checkboxes for common intolerances
                       */}
                       <br/>
                       <form onSubmit={handleSubmit}>
                            
                            <div className = "survey_diet">
                                
                                <h1>Diet Types</h1>
                                <br/>
                                <label for = "gluten_free"> 
                                    <input type="checkbox" name = "gluten_free" />
                                    Gluten Free 
                                </label>

                                
                                <label for = "ketogenic"> 
                                    <input type="checkbox" name = "ketogenic"/>
                                    Ketogenic 
                                </label>

                                
                                <label for = "vegetarian"> 
                                    <input type="checkbox" name = "vegetarian" />
                                    Vegetarian 
                                </label>

                                
                                <label for = "vegan"> 
                                    <input type="checkbox" name = "vegan"/>
                                    Vegan 
                                </label>

                                
                                <label for = "pescetarian"> 
                                    <input type="checkbox" name = "pescetarian"/>
                                    Pescetarian 
                                </label>

                                
                                <label for = "paleo"> 
                                    <input type="checkbox" name = "paleo" />
                                    Paleo 
                                </label>
                            </div>
                            

                            <div className = "survey_intolerances">

                                <br/>
                                <h1>Intolerances</h1>
                                <br/>

                                <label for = "dairy"> 
                                    <input type="checkbox" name = "dairy" />
                                    Dairy
                                </label>

                                
                                <label for = "egg"> 
                                    <input type="checkbox" name = "egg"/>
                                    Egg
                                </label>

                                
                                <label for = "gluten"> 
                                    <input type="checkbox" name = "gluten" />
                                    Gluten
                                </label>

                                
                                <label for = "grain"> 
                                    <input type="checkbox" name = "grain"/>
                                    Grain 
                                </label>

                                
                                <label for = "peanut"> 
                                    <input type="checkbox" name = "peanut"/>
                                    Peanut
                                </label>

                                
                                <label for = "seafood"> 
                                    <input type="checkbox" name = "seafood" />
                                    Seafood
                                </label>

                                <label for = "sesame"> 
                                    <input type="checkbox" name = "Sesame" />
                                    Sesame
                                </label>

                                
                                <label for = "shellfish"> 
                                    <input type="checkbox" name = "shellfish"/>
                                    Shellfish
                                </label>

                                
                                <label for = "soy"> 
                                    <input type="checkbox" name = "soy" />
                                    Soy
                                </label>

                                
                                <label for = "sulfite"> 
                                    <input type="checkbox" name = "sulfite"/>
                                    Sulfite 
                                </label>

                                
                                <label for = "Tree Nut"> 
                                    <input type="checkbox" name = "Tree Nut"/>
                                    Tree Nut
                                </label>

                                
                                <label for = "wheat"> 
                                    <input type="checkbox" name = "wheat" />
                                    Wheat
                                </label>

                            </div>
                            
                            <br/>
                            <input type = "submit" value = "Save"/>
                        </form>
                            


                    </Collapsible>
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