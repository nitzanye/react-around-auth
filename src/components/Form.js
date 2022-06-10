import React from "react";
import {Link} from 'react-router-dom'

const Form = (props) => {
    const {
        name,
        title,
        btnLable,
        linkPath,
        linkText,
        onSubmit,
        children,    
    } = props;

    
    const formRef = React.useRef();

    // const [isValid, setIsValid] = React.useState(false);

    // const handleChange = () => {
    //     setIsValid(formRef.current.checkValdity());
    // };

    // React.useEffect(() => {
    //     validOnOpen && setIsValid(true);
    // }, []);

    return (
        <form
            className="form"
            name={name}
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
        >
            

            <h2 className="form__title">{title}</h2>

            {children}

            <button className='form__submit' type="submit" aria-label={`${btnLable} ${name}`}>
                {btnLable}
            </button>

            {/* <button className={`form__submit ${!isValid && `form__submit-disabled`}`} type="submit" aria-label={`${btnLable} ${name}`}>
                {btnLable}
            </button> */}

            <Link to={linkPath} className="form__link">
                {linkText}
            </Link>
        </form>
    );
    // return (
    //     <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} >
    //     <div className="popup__window">
    //       <h2 className="popup__title">{title}</h2>
    //       <form
    //         className="popup__form"
    //         name={name}
    //         ref={formRef}
    //         onChange={handleChange}
    //         onSubmit={onSubmit}
    //         noValidate
    //       >
    //         {children}
    //         <button
    //           type="submit"
    //           className={`button_type_submit
    //            button button_type_submit button_type_submit${submitBtn} ${
    //             !isValid && "button_type_submit-disabled"
    //           }`}
    //         >
    //           {btnLable}
    //         </button>
    //       </form>
    //       <button
    //         className={`button_type_close button_type_${closeBtn}`}
    //         type="button"
    //         onClick={onClose}
    //       ></button>
    //     </div>
    //   </div>  
    // );
    
} 

//


export default Form;