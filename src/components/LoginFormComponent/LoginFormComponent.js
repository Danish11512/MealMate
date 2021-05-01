import React from 'react';
import "../../pages/LoginPage/LoginPage.css";

const LoginFormComponent = ({submitForm}) => {
    
    return (
        <div className="form-content-right">
            <form className="form">
                <h1 className="welcome">
                    Welcome back!
                </h1>
                
                <div className="form-inputs">
                    <input id="email" type="email" name="email" className="form-input" placeholder="Email"
                    />
                </div>

                <div className="form-inputs">
                    <input id="password" type="password" name="password" className="form-input" placeholder="Password"
                    />
                </div>

            </form>
            <button className="button is-primary is-large forminputbtn" type="submit">
                Sign up
            </button>
    
            <div class="signup">
                Don't have an account? Sign up :)
            </div>
        </div>
    )
}

export default LoginFormComponent