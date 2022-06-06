import React, { useDebugValue } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [currentUser, setcurrentUser] = React.useState({});

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
  };

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  const handleClickOutside = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAddPlacePopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick}
          cards={cards}
        />

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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
