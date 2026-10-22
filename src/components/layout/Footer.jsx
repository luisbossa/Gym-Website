import { HashLink } from "react-router-hash-link";
import { business } from "../../data/business";
import { navLinks } from "../../data/navigation";
import Icon from "../ui/Icon";
import "./Footer.css";

const socials = business.socials.filter(({ url }) => url);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/logo.png" width="160" height="61" alt={business.name} loading="lazy" />
          <p>
            En {business.name} nos dedicamos a ayudarte a alcanzar tus objetivos
            de forma saludable y segura, con programas personalizados,
            instructores certificados y un ambiente motivador para todas las
            edades.
          </p>
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map(({ name, icon, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <img src={icon} alt="" width="20" height="20" loading="lazy" />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="footer-col" aria-label="Pie de página">
          <h3 className="footer-title">Explorar</h3>
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <HashLink smooth to={to}>
                  {label}
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="footer-title">Horarios</h3>
          <ul>
            {business.schedule.map(({ days, hours }) => (
              <li key={days} className="footer-schedule">
                <span>{days}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">Contacto</h3>
          <ul>
            <li>
              <a href={business.phoneHref} className="footer-contact">
                <Icon name="phone" size={16} /> {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="footer-contact">
                <Icon name="mail" size={16} /> {business.email}
              </a>
            </li>
            <li className="footer-contact">
              <Icon name="pin" size={16} /> {business.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {business.name} {business.city}. Todos los
          derechos reservados.
        </p>
        <HashLink smooth to="/#home" className="footer-top">
          Volver arriba
          <Icon name="arrow-left" size={14} style={{ transform: "rotate(90deg)" }} />
        </HashLink>
      </div>
    </footer>
  );
};

export default Footer;
