import React from "react";

import logo from "../../assets/mealLogo.png";
import { auth } from "../../firebase/firebase.utils";
import "./Navbar.css";

const Navbar = (props) => {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					<img src={logo} alt="logo" />
					<p>Meal Mate</p>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					{props.currentUser ?
						<React.Fragment>
							<a className="navbar-item" href="/search">Search</a>
							<a className="navbar-item" href="/grocery">Grocery</a>
							<a className="navbar-item" href="/calendar">Calendar</a>
							<a className="navbar-item" href="/profile">Profile</a>
							<a className="navbar-item" href="/" onClick={() => auth.signOut()}>Logout</a>
						</React.Fragment>
						:
						<a className="navbar-item" href="/login">Login</a>
					}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
