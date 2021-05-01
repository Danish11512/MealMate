import React from "react";
import { withRouter } from "react-router-dom";
import "./ResultCard.css";

function ResultCard(props) {
  return (
    <div className="card__body" onClick={() => props.history.push(`/recipe/${props.id}`)}>
      <img className="card__image" src={props.image} alt="reciepe_img"></img>
      <p>{props.text.length > 20 ? props.text.slice(0, 25) + "..." : props.text}</p>
    </div>
  );
}

export default withRouter(ResultCard);
