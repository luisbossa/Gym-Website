import { useState } from "react";
import { HashLink } from "react-router-hash-link";
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

        {/* LOGO */}
        <HashLink smooth to="/#home">
          <img
            src="/images/logo.png"
            className="navbar-logo"
            width="120"
            alt="Logo"
          />
        </HashLink>

        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <HashLink
            smooth
            to="/#home"
            className="nav-link home"
            onClick={closeMenu}
          >
            Inicio
          </HashLink>

          <HashLink
            smooth
            to="/#training"
            className="nav-link workouts"
            onClick={closeMenu}
          >
            Entrenamientos
          </HashLink>

          <HashLink
            smooth
            to="/#products"
            className="nav-link store"
            onClick={closeMenu}
          >
            Productos
          </HashLink>

          <HashLink
            smooth
            to="/#gallery"
            className="nav-link about"
            onClick={closeMenu}
          >
            Galería
          </HashLink>

          <HashLink
            smooth
            to="/#plans"
            className="nav-link recipes"
            onClick={closeMenu}
          >
            Planes
          </HashLink>

          <HashLink
            smooth
            to="/#contact"
            className="nav-link contact"
            onClick={closeMenu}
          >
            Contacto
          </HashLink>
        </nav>

        <button className="signup-btn">Iniciar sesión</button>

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
