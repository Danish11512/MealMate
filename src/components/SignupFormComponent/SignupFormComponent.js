import React from 'react';
// import validate from '../ValidateSubmitComponent/ValidateSubmitComponent';
// import useSignupForm from '../UseSignupFormComponent/UseSignupComponent';
import "../../pages/SignupPage/SignupPage.css";

const SignupFormComponent = ({submitForm}) => {
    // const {handleChange, values, handleSubmit, errors } = useSignupForm(validate);

    return (
        // class name is whatever you want
        <div className="form-content-right">
            <form className="form" onSubmit={null}>
                <h1 className="welcome">
                    Welcome!
                </h1>
                <div className="form-inputs">
                    <input id="nickname" type="text" name="nickname" className="form-input" placeholder="Nick name" 
                    // value={values.nickname} onChange={handleChange} 
                    />
                    {/* // {errors.nickname && <p>{errors.nickname}</p>} */}
                </div>

                <div className="form-inputs">
                    <input id="email" type="email" name="email" className="form-input" placeholder="Email"
                    // value={values.email} onChange={handleChange} 
                    />
                    {/* //  {errors.email && <p>{errors.email}</p>} */}
                </div>

                <div className="form-inputs">
                    <input id="password" type="password" name="password" className="form-input" placeholder="Password"
                    // value={values.password} onChange={handleChange} 
                    />
                    {/* // {errors.password && <p>{errors.password}</p>} */}
                </div>

                <button className="button is-primary is-large forminputbtn" type="submit">
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default SignupFormComponent