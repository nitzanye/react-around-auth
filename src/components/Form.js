import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  const { name, title, linkPath, linkText, onSubmit, btnLable, children } =
    props;

  const formRef = React.useRef();
  // const [isFormValid, setIsFormValid] = React.useState(false);

  // const handleChange = () => {
  //   setIsFormValid(formRef.current.checkValdity());
  // };

  // React.useEffect(() => {
  //     validOnOpen && setIsFormValid(true);
  // }, []);

  return (
    <form
      className='form'
      name={name}
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className='form__title'>{title}</h2>

      {children}
      <button
        type='submit'
        className='form__submit'
        // className={`form__submit ${!isFormValid && `form__submit-disabled`}`}
        // aria-label={`${btnLable} ${name}`}
      >
        {btnLable}
      </button>
      <Link to={linkPath} className='form__link'>
        {linkText}
      </Link>
    </form>
  );
};

export default Form;
