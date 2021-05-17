import React, {useState} from "react";

import logo from "../../assets/mealLogo.png";
import { auth } from "../../firebase/firebase.utils";
import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar = (props) => 
{
	const [isActive, setIsActive] = useState(false)
	const toggleMenu = () =>
	{
		setIsActive(isActive => !isActive);
	}

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link className="navbar-item" to="/">
					<img src={logo} alt="logo" />
					<p className="navbar__brand">Meal Mate</p>
				</Link>
				<div onClick={toggleMenu} className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} data-target="navbarBasicExample">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active': ''}`}>
				<div className="navbar-end">
					{props.currentUser ?
						<React.Fragment>
							<Link onClick={toggleMenu} className="navbar-item" to="/search">Search</Link>
							<Link onClick={toggleMenu} className="navbar-item" to="/calendar">Calendar</Link>
							<Link onClick={toggleMenu} className="navbar-item" to="/profile">Profile</Link>
							<Link onClick={toggleMenu} className="navbar-item" to="/" onClick={() => auth.signOut()}>Logout</Link>
						</React.Fragment>
						:
						<React.Fragment>
							<Link onClick={toggleMenu} className="navbar-item" to="/login">Login</Link>
						</React.Fragment>
					}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
