function Card(props) {
  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="cards__card" key={card._id}>
      <button type="button" className="button button_type_delete"></button>
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      ></img>
      <div className="cards__content">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-wrapper">
          <button type="button" className="button button_style_like"></button>
          <span className="cards__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
