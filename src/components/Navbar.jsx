import React from "react";
import logo from "./static/mealLogo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="logo"/>
          <p>Meal Mate</p>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item" href="/">Search</a>
          <a className="navbar-item" href="/">Grocery</a>
          <a className="navbar-item" href="/">Calendar</a>
          <a className="navbar-item" href="/profile">Profile</a>
          <a className="navbar-item" href="/">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
