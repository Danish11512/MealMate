import React from "react";

import logo from "../../assets/mealLogo.png";
import { auth } from "../../firebase/firebase.utils";
import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar = (props) => {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link className="navbar-item" to="/">
					<img src={logo} alt="logo" />
					<p className="navbar__brand">Meal Mate</p>
				</Link>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					{props.currentUser ?
						<React.Fragment>
							<Link className="navbar-item" to="/search">Search</Link>
							<Link className="navbar-item" to="/grocery">Grocery</Link>
							<Link className="navbar-item" to="/calendar">Calendar</Link>
							<Link className="navbar-item" to="/profile">Profile</Link>
							<Link className="navbar-item" to="/" onClick={() => auth.signOut()}>Logout</Link>
						</React.Fragment>
						:
						<Link className="navbar-item" to="/login">Login</Link>
					}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
