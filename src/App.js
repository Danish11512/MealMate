import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, firestore } from "./firebase/firebase.utils";
import Navbar from "./components/NavbarComponent/Navbar";
import SearchPage from "./pages/SearchPage/SearchPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ResultsPage from "./pages/ResultPage/SearchResultPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import LandingPage from './pages/LandingPage/LandingPage';

const App = () => {
	const [currentUser, setCurrentUser] = useState("wait");
	const unsubscribeFromAuth = useRef(null);
	const unsubscribeFromUser = useRef(null);

	useEffect(() => {
		const authHandler = async () => {
			unsubscribeFromAuth.current = auth.onAuthStateChanged(
				async (userAuth) => {
					if (unsubscribeFromUser.current !== null)
						unsubscribeFromUser.current();
					if (userAuth) {
						const userRef = firestore.doc(`users/${userAuth.uid}`);
						const snapShot = await userRef.get();
						setCurrentUser(snapShot.data());

						unsubscribeFromUser.current = userRef.onSnapshot((snapShot) => {
							setCurrentUser(snapShot.data());
						});
					} else {
						setCurrentUser(null);
					}
				}
			);
		};

		authHandler();

		return () => {
			unsubscribeFromAuth.current();
			if (unsubscribeFromUser.current !== null) unsubscribeFromUser.current();
		};
	}, []);

	if(currentUser === "wait")
		return null;
		
	return (
		<div className="App">
			<Navbar currentUser={currentUser} />
			<Switch>
				<Route
					path="/recipe/:id"
					render={() => currentUser ? (<RecipeDetailsPage currentUser={currentUser} />) : (<Redirect to="/" />)}
				/>
				<Route
					path="/login"
					render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
				/>
				<Route
					path="/signup"
					render={() => (currentUser ? <Redirect to="/" /> : <SignUpPage />)}
				/>
				<Route
					path="/profile"
					render={() =>
						currentUser ? (
							<ProfilePage currentUser={currentUser} />
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					path="/search"
					render={() =>
						currentUser ? (
							<SearchPage currentUser={currentUser} />
						) : (
							<Redirect to="/" />
						)
					}
				/>

				<Route
					path="/results"
					render={() => (currentUser ? <ResultsPage /> : <Redirect to="/" />)}
				/>
            
				<Route path="/" render={() => currentUser ? <SearchPage currentUser={currentUser}/> : <LandingPage currentUser={currentUser}/>} />
			</Switch>
		</div>
	);
};

export default App;