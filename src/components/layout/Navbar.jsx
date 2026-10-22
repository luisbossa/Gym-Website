import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { navLinks } from "../../data/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { getInitials } from "../../utils/format";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import Icon from "../ui/Icon";
import "./Navbar.css";

const sectionIdOf = (to) => to.split("#")[1];

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, openAuth } = useAuth();
  const { count, open: openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Bloquea el scroll y permite cerrar con Escape mientras el menú móvil está abierto
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => event.key === "Escape" && setIsOpen(false);
    lockScroll();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el enlace de la sección que ocupa el centro de la pantalla
  useEffect(() => {
    // El hero también se observa para limpiar el resaltado al volver arriba
    const sections = ["hero", ...navLinks.map(({ to }) => sectionIdOf(to))]
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!sections.length) {
      setActiveId("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  const handleLogin = () => {
    closeMenu();
    openAuth("login");
  };

  return (
    <header className={`navbar ${isScrolled || isOpen ? "is-solid" : ""}`}>
      <div className="noise"></div>

      <div className="navbar-inner">
        <HashLink smooth to="/#home" className="navbar-brand" onClick={closeMenu}>
          <img src="/images/logo.png" width="120" height="45" alt="Body Control" />
        </HashLink>

        <nav
          id="main-menu"
          className={`nav-links ${isOpen ? "is-open" : ""}`}
          aria-label="Principal"
        >
          {navLinks.map(({ to, label }) => (
            <HashLink
              key={to}
              smooth
              to={to}
              className={`nav-link ${activeId === sectionIdOf(to) ? "is-active" : ""}`}
              onClick={closeMenu}
            >
              {label}
            </HashLink>
          ))}

          {user ? (
            <Link to="/cuenta" className="nav-link nav-menu-only" onClick={closeMenu}>
              Mi cuenta
            </Link>
          ) : (
            <button type="button" className="nav-link nav-menu-only" onClick={handleLogin}>
              Iniciar sesión
            </button>
          )}

          <HashLink smooth to="/#plans" className="gold-btn nav-menu-cta" onClick={closeMenu}>
            Únete ahora
          </HashLink>
        </nav>

        <div className="navbar-actions">
          {user ? (
            <Link to="/cuenta" className="nav-account" title="Mi cuenta" onClick={closeMenu}>
              <span className="nav-avatar">{getInitials(user.name)}</span>
              <span className="nav-account-name">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <button type="button" className="nav-login" onClick={handleLogin}>
              Iniciar sesión
            </button>
          )}

          <button
            type="button"
            className="nav-icon-btn"
            aria-label={`Abrir carrito (${count} productos)`}
            onClick={() => {
              closeMenu();
              openCart();
            }}
          >
            <Icon name="bag" size={22} />
            {count > 0 && <span className="nav-badge">{count}</span>}
          </button>

          {!user?.membership && (
            <HashLink smooth to="/#plans" className="gold-btn navbar-cta">
              Únete
            </HashLink>
          )}

          <button
            type="button"
            className="menu-toggle"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="main-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <Icon name={isOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
