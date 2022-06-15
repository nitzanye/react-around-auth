import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import hamburgerOpen from '../images/hamburgerOpen.svg';
import hamburgerClose from '../images/hamburgerClose.svg';

const Header = (props) => {
  const { loggedIn, userEmail, handleLogout, linkPath, linkText } = props;

  const [isDropDownOpen, setisDropDownOpen] = React.useState(false);

  const toggleHamburger = () => {
    setisDropDownOpen(!isDropDownOpen);
  };

  const handleLogOutFromHamburger = () => {
    toggleHamburger();
    handleLogout();
  };

  return (
    <>
      {loggedIn && (
        <div
          className={
            isDropDownOpen ? 'header__menu header__menu-open' : 'header__menu'
          }
        >
          <p className='header__hamburger-email'>{userEmail}</p>
          <Link
            to={linkPath}
            onClick={handleLogOutFromHamburger}
            className='header__hamburger-link'
          >
            {linkText}
          </Link>
        </div>
      )}
      <header className='header'>
        <Link to='/'>
          <img
            className='logo logo__image'
            src={logo}
            id='logo'
            alt='Around the U.S.'
          />
        </Link>
        {loggedIn ? (
          <div>
            <nav className='header__menu-container'>
              <p className='header__email'>{userEmail}</p>
              <Link
                to={linkPath}
                onClick={handleLogout}
                className='header__link'
              >
                {linkText}
              </Link>
            </nav>
            <button className='header__hamburger' onClick={toggleHamburger}>
              <img
                src={!isDropDownOpen ? hamburgerOpen : hamburgerClose}
                className='header__hamburger-icon'
                alt=''
              />
            </button>
          </div>
        ) : (
          <nav className='header__menu-container'>
            <Link to={linkPath} className='header__link'>
              {linkText}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
