import { HashLink } from "react-router-hash-link";
import { business } from "../../data/business";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <section className="section">
      <Reveal className="cta-banner">
        <img
          className="cta-image"
          src="/images/contact-img.jpg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="cta-overlay"></div>

        <div className="cta-content">
          <p className="eyebrow">/// Empieza hoy</p>
          <h2 className="section-heading">
            Tu primer paso <span className="gold-text">empieza aquí</span>
          </h2>
          <p className="section-subtitle">
            Nuestro equipo te recibe, evalúa tu condición y te ayuda a elegir el
            plan ideal para tus objetivos.
          </p>

          <div className="cta-actions">
            <HashLink smooth to="/#plans" className="gold-btn">
              Elegir mi plan
              <Icon name="arrow-right" size={18} />
            </HashLink>
            <a href={business.phoneHref} className="outline-btn">
              <Icon name="phone" size={16} />
              Llamar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CallToAction;
