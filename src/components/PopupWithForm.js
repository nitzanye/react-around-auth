function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__window">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children}
          <button
            type="submit"
            className={`button button_type_submit button_type_submit${props.submitBtn}`}
          >
            {props.btnLable}
          </button>
        </form>
        <button
          className={`button_type_close button_type_${props.closeBtn}`}
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
