import { features } from "../../data/features";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Features.css";

const Features = () => {
  return (
    <section id="about" className="section features">
      <SectionHeader
        eyebrow="Nosotros"
        title="¿Por qué Body Control?"
        subtitle="Te ayudamos a alcanzar tus objetivos de forma saludable y segura, con un acompañamiento real en cada entrenamiento."
      />

      <Reveal stagger className="features-grid">
        {features.map(({ icon, title, text }) => (
          <article key={title} className="card feature-card">
            <span className="feature-icon">
              <Icon name={icon} size={26} strokeWidth={1.75} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
};

export default Features;
