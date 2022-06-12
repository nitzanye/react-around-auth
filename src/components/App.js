import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from '../components/ProtectedRoute';
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import api from '../utils/api';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {
  const [currentUser, setcurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserData(userData);
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            const userData = {
              email: res.email,
            };
            setLoggedIn(true);
            setUserData(userData);
          }
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    }
  }, []);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     navigate('/');
  //   } else {
  //     navigate('/signin');
  //   }
  // }, [loggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin');
    setLoggedIn(false);
    setUserData('');
  };

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => setcurrentUser(res))
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isPreviewPlacePopupOpen, setIsPreviewPlacePopupOpen] =
    React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);

  const [isDataLoading, setIsDataLoading] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  // // const [infoTooltipText, setInfoTooltipText] = React.useState('');

  // const handleUpdateInfoTooltip = () => {
  //   setIsSuccess();
  //   // setInfoTooltipText();
  //   setIsInfoTooltipOpen(true);
  // };

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedToDeleteCard, setSelectedToDeletecard] = React.useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPreviewPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setSelectedToDeletecard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleUpdateUser = (user) => {
    setIsDataLoading(true);
    api
      .updateUserInfo(user)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    setIsDataLoading(true);
    api
      .updateUserAvatar(newAvatarLink)
      .then((updateUserInfo) => {
        setcurrentUser(updateUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleAddPlaceSubmit = (cardName, cardLink) => {
    setIsDataLoading(true);
    api
      .addNewCard(cardName, cardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleCardDeleteSubmit = (card) => {
    setIsDataLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeletecard(null);
    setIsInfoTooltipOpen(false);
  };

  const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleClickOutside = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  const handleUserRegister = (password, email) => {
    setIsDataLoading(true);
    // Set button to loading...
    if (!email || !password) {
      return;
    }
    auth
      .register(password, email)
      .then(() => {
        setIsSuccess(true);
        // open OK authentication Tooltip
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        // open NOT OK authentication Tooltip
      })
      .finally(() => {
        setIsDataLoading(false);
        setIsInfoTooltipOpen(true);
      })

    // .finally(() => {
    //   // re-set button to Register.
    // });
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isAddPlacePopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
        // loggedIn={loggedIn}
        // linkText={'Log out'}
        // userData={userData}
        // onLogout={handleLogout}
        />
        <Routes>
          <Route
            path='/signin'
            element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
          />
          {/* <Header loggedIn={loggedIn} linkText={'Sign up'} linkPath={'/signout'} /> */}
          <Route
            path='/signup'
            element={
              <Register
                onSubmit={handleUserRegister}
                loggedIn={loggedIn}
                handleLogin={handleLogin}
              />
            }
          />
          {/* <Header  loggedIn={loggedIn}  linkText={'Log in'} linkPath={'/signin'} /> */}
          <Route
            path='/'
            element={
              <ProtectedRoute
                exact
                redirectPath='/signin'
                loggedIn={loggedIn}
                userData={userData}
              >
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleCardDeleteClick}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isPreviewPlacePopupOpen}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataLoading={isDataLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataLoading={isDataLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isDataLoading={isDataLoading}
        />

        <ConfirmDeletePopup
          card={selectedToDeleteCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDeleteSubmit={handleCardDeleteSubmit}
          isDataLoading={isDataLoading}
        />

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
