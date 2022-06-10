import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import Form from "./Form";

const Login = (props) => {
    const{ isDataLoding } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, SetMessage] = useState('');

    const navigate = useNavigate();

    const resetForm = () => {
       SetMessage('');
       setEmail('');
       setPassword(''); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        auth
            .authorize(email, password)
             .then((data) => {
                 if (!data) {
                    SetMessage('Something went wrong , please try again');
                 }
                 if (data.jwt) {
                     resetForm();
                     props.handleLogin(data.user);
                     navigate('/');
                     return;
                 }
             }
        ).catch(err => console.log(err));
    }

    

    return (
        <section className="auth-form">
          <p className="login__welcome">
            Log in
          </p>
          <p className="login__error">
              {message}
          </p>
          <Form
            name="login"
            title="Log in"
            btnLable={(isDataLoding) ? 'Logging in' : 'Log in'}
            linkPath="signin"
            linkText="Not a member yet? Sign up here!"
            onSubmit={handleSubmit}>

            <input 
                className="form__input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
             {/* <span id="email-error" className={`form__error ${(!isValid && 'form__error_visible')}`}>
              {errorMessage}
            </span> */}

            <input 
                className="form__input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
             {/* <span id="password-error" className={`form__error ${(!isValid && 'form__error_visible')}`}>
              {errorMessage}
            </span> */}

            </Form>
        </section>
      );
}

export default Login;

