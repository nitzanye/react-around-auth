import React from 'react';
import { useState } from 'react';
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from './Form';

const Register = (props) => {
  const { onSubmit, isDataLoding } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [message, SetMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password, email);
  };

  return (
    <section className='auth-form'>
      {/* <p className='register__welcome'>Sign up</p> */}
      <Form
        name='register'
        title='Sign up'
        btnLable={isDataLoding ? 'Signing up' : 'Sign up'}
        linkPath='/signin'
        linkText='Already a member? Log in here!'
        onSubmit={handleSubmit}
      >
        <input
          // className={`form__input ${!isValid && 'form__input_type_error'}`}
          className='form__input'
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* <span id="email-error" className={`form__error ${!isValid && 'form__error_visible'}`}>
              {errorMessage}
            </span> */}

        <input
          // className={`form__input ${!isValid && 'form__input_type_error'}`}
          className='form__input'
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <span id="password-error" className={`form__error ${!isValid && 'form__error_visible'}`}>
              {errorMessage}
            </span> */}
      </Form>
    </section>
  );
};

export default Register;
