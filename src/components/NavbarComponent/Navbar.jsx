import React from "react";

import logo from "../../assets/mealLogo.png";
import { auth } from "../../firebase/firebase.utils";
import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar = (props) => 
{
	let navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
	if(navbarBurgers.length > 0)
	{
		navbarBurgers.forEach(burger => 
		{
			burger.addEventListener('click', () =>{
				const target = burger.dataset.target
				const targetElement = document.getElementById(target)

				burger.classList.toggle('is-active');
				targetElement.classList.toggle('is-active');
			});
		});
	}

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link className="navbar-item" to="/">
					<img src={logo} alt="logo" />
					<p className="navbar__brand">Meal Mate</p>
				</Link>
				<div className="navbar-burger burger" data-target="navbarBasicExample">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					{props.currentUser ?
						<React.Fragment>
							<Link className="navbar-item" to="/search">Search</Link>
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
