import React from "react";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isPreviewPlacePopupOpen, setIsPreviewPlacePopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPreviewPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isPreviewPlacePopupOpen}
      />

      <PopupWithForm
        name="avatar"
        closeBtn="close-avatar"
        title="Change profile picture"
        btnLable="Save"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="avatarlink-input"
          type="url"
          className="popup__input popup__input_avatarlink"
          name="avatarlink"
          placeholder="Image link"
          required
        />
        <span id="avatarlink-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        closeBtn="close-profile"
        title="Edit profile"
        btnLable="Save"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_description_name"
          name="name"
          placeholder="Your name"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-input-error" className="popup__error"></span>

        <input
          id="job-input"
          type="text"
          className="popup__input popup__input_description_job"
          name="job"
          placeholder="Your job"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="job-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        closeBtn="close-add"
        title="New place"
        btnLable="Create"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="card-name-input"
          type="text"
          className="popup__input popup__input_new_title"
          name="nameInput"
          placeholder="Title"
          required
          minLength="1"
          maxLength="30"
        />
        <span id="card-name-input-error" className="popup__error"></span>

        <input
          id="card-link-input"
          type="url"
          className="popup__input popup__input_new_url"
          name="linkInput"
          placeholder="Image link"
          required
        />
        <span id="card-link-input-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        closeBtn="close-delete-card"
        title="Are you sure?"
        btnLable="Yes"
      ></PopupWithForm>

      <Footer />
    </div>
  );
}

export default App;
