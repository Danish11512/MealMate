import React from "react";
import "./ResultCard.css";
function ResultCard({ image, text }) {
  return (
    <div className="card__body">
      <img className="card__image" src={image} alt="reciepe_img"></img>
      <p>{text.length > 20 ? text.slice(0, 25) + "..." : text}</p>
    </div>
  );
}

export default ResultCard;
