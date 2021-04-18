import React, {useState} from 'react';
import "../../pages/LoginPage/LoginPage.css";
import { auth } from '../../firebase/firebase.utils';

const LoginFormComponent = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        try
        {
            const emailVar = email;
            const passwordVar = password;
            setEmail('');
            setPassword('');
            await auth.signInWithEmailAndPassword(emailVar, passwordVar);
        }
        catch(error)
        {
            alert(error.message);
        }
    }

    return (
        // class name is whatever you want
        <div className="form-content-right" onSubmit={handleSubmit}>
            <form className="form">
                <h1 className="welcome">
                    Welcome back!
                </h1>
                
                <div className="form-inputs">
                    <input id="email" type="email" name="email" className="form-input" placeholder="Email" autoComplete="on" required
                            value={email}  onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="form-inputs">
                    <input id="password" type="password" name="password" className="form-input" placeholder="Password" autoComplete="on" required
                            value={password}  onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button className="form-input-btn submit" type="submit">
                    Login
                </button>
            </form>
            <a className="signup" href="/signup">
                Don't have an account? Sign up :)
            </a>
        </div>
    )
}

export default LoginFormComponent