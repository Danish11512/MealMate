import React from 'react';
import { withRouter } from 'react-router-dom'

import './ProfileRecipeCardComponent.css'

const ProfileRecipeCardComponent = (props) => {
    return(
        <div className="profile-recipe-card" onClick={() => props.history.push(`/recipe/${props.recipe.id}`)}>
            <div className="profile-recipe-card-image-container">
                <img src={props.recipe.image} alt={props.recipe.title}/>
            </div>
            <h1>{props.recipe.title}</h1>
        </div>
    );
}

export default withRouter(ProfileRecipeCardComponent);