import React from "react";
import { useHistory } from "react-router-dom";

function CircleView({ image, text }) {
  const history = useHistory();
  return (
    <div
      className="circle__view"
      onClick={() =>
        history.push("/results", { searchQuery: false, cuisineType: text })
      }
    >
      <img className="circle__view__img" src={image} alt="cusines" />
      <p className="circle__view__text">{text}</p>
    </div>
  );
}

export default CircleView;
