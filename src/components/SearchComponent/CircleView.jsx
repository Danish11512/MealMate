import React from "react";

function CircleView({ image, text }) {
  return (
    <div className="circle__view">
      <img className="circle__view__img" src={image} />
      <p className="circle__view__text">{text}</p>
    </div>
  );
}

export default CircleView;
