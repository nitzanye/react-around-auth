import React from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import * as auth from '../utils/auth';
import Form from './Form';

const Login = (props) => {
  const { isDataLoding, onSubmit } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  // const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    const { value, validity, validationMessage } = e.target;
    setEmail(value);
    setIsEmailValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };

  const handleChangePassword = (e) => {
    const { value, validity, validationMessage } = e.target;
    setPassword(value);
    setIsPasswordValid(validity.valid);
    !validity.valid && setErrorMessage(validationMessage);
  };
  // const formRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!formRef.current.checkValidity()) {
    //   formRef.current.reportValidity();
    //   return;
    // }
    onSubmit(password, email);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(password, email);
  // };

  // const resetForm = () => {
  //   //  SetMessage('');
  //    setEmail('');
  //    setPassword('');
  // }

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!email || !password) {
  //         return;
  //     }
  //     auth
  //         .authorize(email, password)
  //          .then((data) => {
  //              if (!data) {
  //                 SetMessage('Something went wrong , please try again');
  //              }
  //              if (data.jwt) {
  //                  resetForm();
  //                  props.handleLogin(data.user);
  //                  navigate('/');
  //                  return;
  //              }
  //          }
  //     ).catch(err => console.log(err));
  // }

  return (
    <section className='auth-form'>
      <Form
        name='login'
        title='Log in'
        btnLable={isDataLoding ? 'Logging in' : 'Log in'}
        linkPath='/signup'
        linkText='Not a member yet? Sign up here!'
        onSubmit={handleSubmit}
      >
        <input
          className={`form__input ${!isEmailValid && 'form__input_type_error'}`}
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span
          id='email-input-error'
          className={`form__error ${!isEmailValid && 'form__error_visible'}`}
        >
          {errorMessage}
        </span>

        <input
          className={`form__input ${
            !isPasswordValid && 'form__input_type_error'
          }`}
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span
          id='password-input-error'
          className={`form__error ${!isPasswordValid && 'form__error_visible'}`}
        >
          {errorMessage}
        </span>
        {/* <button
          type='submit'
          className='form__submit'
          // className={`form__submit ${!isFormValid && `form__submit-disabled`}`}
          // type='submit'
          // aria-label={`${btnLable} ${name}`}
        >
          {btnLable}
        </button> */}
      </Form>
    </section>
  );
};

export default Login;
