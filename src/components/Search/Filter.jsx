import React, { useState } from "react";
import hamburger from "../static/hamburgericon.png";

function Filter() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="hamburger">
      <img src={hamburger}></img>
    </div>
  );
}

export default Filter;
