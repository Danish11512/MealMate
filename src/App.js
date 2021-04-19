import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, firestore } from "./firebase/firebase.utils";
import Navbar from "./components/NavbarComponent/Navbar";
import SearchPage from "./pages/SearchPage/SearchPage";
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
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

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <Switch>
        <Route path="/login" render={() => currentUser ? (<Redirect to="/"/>) :(<LoginPage/>)}></Route>
        <Route path="/signup" render={() => currentUser ? (<Redirect to="/"/>) :(<SignUpPage/>)}></Route>
        <Route path="/profile" render={() => currentUser ? (<ProfilePage/>) :(<Redirect to="/"/>)}></Route>
        <Route path="/" render={() => null}></Route>
      </Switch>
    </div>
  );
};

export default App;
