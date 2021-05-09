import React, { useState, useEffect } from 'react';
import ReactRoundedImage from "react-rounded-image";
import Carousel from 'react-elastic-carousel';

import "./ProfilePage.css";
import logo from "../../assets/mealLogo.png";
import { getRecipe } from "../../firebase/firebase.utils";
import SurveyForm  from "../../components/ProfileComponent/Survey";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const ProfilePage = (props) =>{

	const [prevRecipes, setprevRecipes] = useState([]);
	const [favRecipes, setfavRecipes] = useState([]);

	const breakPoints = [
		{width: 1, itemsToShow: 1 },
		{width: 500, itemsToShow: 2 },
		{width: 750, itemsToShow: 3 },
		{width: 1200, itemsToShow: 4 }
	];

	// Read from firebase props.currentUser.favorites
	const fetchFavoriteRecipes = async () => {
		for(const [index, value] of props.currentUser.favorites.entries()){
			let response = await getRecipe(value)
			setfavRecipes(favRecipes => [...favRecipes,response]);
		}
		console.log(favRecipes)
		// I get the array of values properly
		console.log("Here are the values in favorites from firebase:", props.currentUser.favorites)
	};

	// Read from firebase props.currentUser.previousRecipes
	const fetchPreviousRecipes = async () => {
		for(const [index, value] of props.currentUser.previousRecipes.entries()){
			let response = await getRecipe(value.toString())
			setprevRecipes(prevRecipes => [...prevRecipes,response]);
		}
		console.log(prevRecipes)
		console.log("Here are the values in previousRecipes from firebase:", props.currentUser.previousRecipes)
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
			// Email sent.
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

					<button onClick={ChangePassword}>Change Password</button>

					<br/>
					<br/>

					<SurveyForm user = {props} />
				</div>

			</div>

			<div className="bottom_row">
				
				<h1><strong>Favorite Recipes</strong></h1>
				<br/>

				<div className = 'favorite_recipes'>
					
					<Carousel breakPoints = {breakPoints}>

						{favRecipes.length > 0 ? (
							favRecipes.map((el) => {
								
								return(
									
									<div className = 'card'>
										<h1> { el.title } </h1>
										<img src ={ el.image } alt = 'Favorite Food Item'></img>
									</div>
									
								);
							})
						) : (
							<h1>No favorite recipes</h1>
						)}
					</Carousel>		

				</div>
				
				<br/>
				<h1><strong>Previous Recipes</strong></h1>
				<br/>

				<div className= 'previous_recipes'>

					<Carousel breakPoints = {breakPoints}>

						{prevRecipes.length > 0 ? (
							prevRecipes.map((el) => {
								
								return(
									
									<div className = 'card'>
										<h1> { el.title } </h1>
										<img src ={ el.image } alt = 'Previous Food Item'></img>
									</div>
									
								);
							})
						) : (
							<h1>No previous recipes</h1>
						)}

					</Carousel>

				</div>

			</div>
			
		</div>
	)

}

export default ProfilePage;