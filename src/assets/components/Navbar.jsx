import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <header className="navbar">
      <div className="navbar-wrapper">
        <div className="noise"></div>

        <a href="/">
          <img
            src="/images/logo.png"
            className="navbar-logo"
            width="120"
            alt="Logo"
          />
        </a>

        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link home" onClick={closeMenu}>
            Inicio
          </a>
          <a href="#training" className="nav-link workouts" onClick={closeMenu}>
            Entrenamientos
          </a>
          <a href="#products" className="nav-link store" onClick={closeMenu}>
            Productos
          </a>
          <a href="#gallery" className="nav-link about" onClick={closeMenu}>
            Galería
          </a>
          <a href="#plans" className="nav-link recipes" onClick={closeMenu}>
            Planes
          </a>
          <a href="#contact" className="nav-link contact" onClick={closeMenu}>
            Contacto
          </a>
        </nav>

        <a className="signup-btn">Iniciar sesión</a>

        <button
          className="menu-toggle"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
