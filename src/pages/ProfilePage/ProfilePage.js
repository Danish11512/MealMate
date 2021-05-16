import React, { useState, useEffect } from 'react';
import ReactRoundedImage from "react-rounded-image";

import "./ProfilePage.css";
import logo from "../../assets/mealLogo.png";
import { getRecipe } from "../../firebase/firebase.utils";
import SurveyForm  from "../../components/ProfileComponent/Survey";
import ProfileRecipeCardComponent from '../../components/ProfileRecipeCardComponent/ProfileRecipeCardComponent';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const ProfilePage = (props) =>{

	const [prevRecipes, setprevRecipes] = useState([]);
	const [favRecipes, setfavRecipes] = useState([]);

	const fetchFavoriteRecipes = async () => {
		for(const [index, value] of props.currentUser.favorites.entries()){
			let response = await getRecipe(value)
			setfavRecipes(favRecipes => [...favRecipes,response]);
		}
	};

	const fetchPreviousRecipes = async () => {
		for(const [index, value] of props.currentUser.previousRecipes.entries()){
			let response = await getRecipe(value.toString())
			setprevRecipes(prevRecipes => [...prevRecipes,response]);
		}
	};

	useEffect(() => {
		fetchFavoriteRecipes();
		fetchPreviousRecipes();
	  }, []);
	 
	function ChangePassword(e){
		e.preventDefault();
		var auth = firebase.auth();
		var emailAddress = props.currentUser.email;

		auth.sendPasswordResetEmail(emailAddress).then(function() {
			alert("Password reset link has been sent to your email!")
		}).catch(function(error) {
			alert("Here is the error that occured:" + error)
		});
	}
   
	return (
		<div className="profile-page">
			<div className="profile-container">
				<div className="top_row" >

					<div className="greeting">
						<ReactRoundedImage className="img-valign" image= {logo} roundedSize="0" imageWidth="110" imageHeight="110" />
						<h1 className="username"> Hi, { props.currentUser.displayName }</h1>
					</div>

					<div className="vertical_line"></div>

					<div className="user_info">
						<span><strong>Nickname:</strong>   { props.currentUser.displayName }</span>
						<span><strong>Email:</strong>   { props.currentUser.email }</span>
						<button onClick={ChangePassword}>Change Password</button>
						<SurveyForm props = {props} />
					</div>

				</div>

				<div className="bottom_row">
					
					<div className="favorite-recipes">
						<h1 className="favorite-recipes-title">Favorite Recipes</h1>

						<div className="favorites-container">
							{favRecipes.length > 0 ?
								favRecipes.map((recipe, index) =>{
									return <ProfileRecipeCardComponent recipe={recipe} key={index} />
								})
								:
								<div>No Favorited Recipes</div>
							}
						</div>
					</div>
					
					<div className="previous-recipes">
						<h1 className="previous-recipes-title">Previous Recipes</h1>

						<div className="previous-container">
							{prevRecipes.length > 0 ?
								prevRecipes.map((recipe, index) =>{
									return <ProfileRecipeCardComponent recipe={recipe} key={index} />
								})
								:
								<div>No Previous Recipes</div>
							}
						</div>
					</div>

				</div>
			</div>
			
		</div>
	)

}

export default ProfilePage;