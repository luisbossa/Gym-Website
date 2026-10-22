import { HashLink } from "react-router-hash-link";
import { programs } from "../../data/programs";
import { plans } from "../../data/plans";
import { formatPrice } from "../../utils/format";
import Icon from "../ui/Icon";
import "./Hero.css";

const lowestPrice = Math.min(...plans.map((plan) => plan.price));

const facts = [
  { value: programs.length, label: "Programas de entrenamiento" },
  { value: plans.length, label: "Planes de membresía" },
  { value: `₡${formatPrice(lowestPrice)}`, label: "Planes desde, por mes" },
  { value: "5 a.m.", label: "Abrimos entre semana" },
];

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="hero-video"
        >
          <source src="/videos/video-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Body Control · San Ramón</p>
          <h1 className="hero-title">
            Alcanza tu <span className="gold-text">mejor versión</span>
          </h1>
          <p className="hero-subtitle">
            Programas personalizados, instructores certificados y un ambiente que
            te impulsa a dar más cada día.
          </p>

          <div className="hero-actions">
            <HashLink className="gold-btn" smooth to="/#plans">
              Comienza ahora
              <Icon name="arrow-right" size={18} />
            </HashLink>
            <HashLink className="outline-btn hero-secondary" smooth to="/#training">
              Ver entrenamientos
            </HashLink>
          </div>
        </div>
      </div>

      <ul className="hero-facts">
        {facts.map(({ value, label }) => (
          <li key={label} className="hero-fact">
            <strong>{value}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hero;
