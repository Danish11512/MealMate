import React, {useState} from 'react';
import "../../pages/SignupPage/SignupPage.css";
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignupFormComponent = () => {

	const signUpObject = {
		nickname: '',
		email: '',
		password: ''
	};

	const [values, setValues] = useState({...signUpObject});

	const handleChange = e => {
		const { name, value} = e.target
		setValues({
			...values,
			[name]: value
		});
	};
    
	const handleSubmit = async (e) =>
	{
		e.preventDefault();

		try{
			const tempValues = {...values};
			setValues({...signUpObject});
			const { user } = await auth.createUserWithEmailAndPassword(tempValues.email, tempValues.password);
			await createUserProfileDocument(user, { displayName: tempValues.nickname });
		}
		catch(error)
		{
			alert(error.message);
		}
	}

	return (
		<div className="form-content-right">
			<form className="form" onSubmit={handleSubmit}>
				<h1 className="welcome">
                    Welcome!
				</h1>
				<div className="form-inputs">
					<input id="nickname" type="text" name="nickname" className="form-input" placeholder="Nick name" autoComplete="on" required
						value={values.nickname} onChange={handleChange} />
				</div>

				<div className="form-inputs">
					<input id="email" type="email" name="email" className="form-input" placeholder="Email" autoComplete="on" required
						value={values.email} onChange={handleChange} />
				</div>

				<div className="form-inputs">
					<input id="password" type="password" name="password" className="form-input" placeholder="Password" autoComplete="on" required
						value={values.password} onChange={handleChange} />
				</div>

				<button className="form-input-btn submit" type="submit">
                    Sign up
				</button>
			</form>
			<a className="login" href="/login">
                Already have an account? Login :)
			</a>
		</div>
	)
}

export default SignupFormComponent