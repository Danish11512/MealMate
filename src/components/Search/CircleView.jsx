import React from "react";
import "../../styles/SearchPage.css";

function CircleView({ image, text }) {
  console.log(text);
  return (
    <div className="circle__view">
      <img className="circle__view__img" src={image} />
      <p className="circle__view__text">{text}</p>
    </div>
  );
}

export default CircleView;
