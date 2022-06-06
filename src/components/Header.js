import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img
          className="logo__image"
          src={logo}
          id="logo"
          alt="Around the U.S."
        />
      </div>
    </header>
  );
}

export default Header;
