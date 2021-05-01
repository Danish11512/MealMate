import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const unsubscribeFromAuth = useRef(null);
	const unsubscribeFromUser = useRef(null);

	useEffect(() =>
	{
		const authHandler = async () =>
		{
			unsubscribeFromAuth.current = auth.onAuthStateChanged( async userAuth => {
				if(unsubscribeFromUser.current !== null)
					(unsubscribeFromUser.current)();

				if(userAuth)
				{
					const userRef = await createUserProfileDocument(userAuth);
					const snapShot = await userRef.get();
					setCurrentUser(snapShot.data());

					unsubscribeFromUser.current = userRef.onSnapshot(snapShot =>{
						setCurrentUser(snapShot.data());
					});
				}
				else
				{
					setCurrentUser(null);
				}
			});
		}

		authHandler();

		return () => {
			(unsubscribeFromAuth.current)();
			if(unsubscribeFromUser.current !== null)
				(unsubscribeFromUser.current)();
		}
	}
	,[])
    
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" render={() => (<SignupPage />)}></Route>
				<Route path="/login" render={() => (<LoginPage />)}></Route>
			</Switch>
		</div>
	);
};

export default App;
