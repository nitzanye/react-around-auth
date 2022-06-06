import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const {
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onCardClick,
  } = props;

  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setUserData({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar,
        });
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={userData.userAvatar}
            alt="profile image"
          />
          <button
            type="button"
            className="profile__image-update-icon"
            onClick={onEditAvatarClick}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__wrapper-name">
            <h1 className="profile__name">{userData.userName}</h1>
            <button
              type="button"
              className="button button_type_edit"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job">{userData.userDescription}</p>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
