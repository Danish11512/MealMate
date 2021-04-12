import React from "react";
import logo from "./static/mealLogo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src={logo} />
          <p>Meal Mate</p>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">Search</a>
          <a class="navbar-item">Grocery</a>
          <a class="navbar-item">Calendar</a>
          <a class="navbar-item">Profile</a>
          <a class="navbar-item">Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
