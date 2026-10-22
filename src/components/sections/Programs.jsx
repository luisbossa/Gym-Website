import { Link } from "react-router-dom";
import { programs } from "../../data/programs";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Programs.css";

const Programs = () => {
  return (
    <section id="training" className="section">
      <SectionHeader
        eyebrow="Entrenamientos"
        title="Encuentra tu programa"
        subtitle="Cinco programas diseñados para cada objetivo y nivel. Elige uno y mira el plan completo de ejercicios."
      />

      <Reveal stagger className="program-grid">
        {programs.map(({ id, title, image, level, duration }) => (
          <Link key={id} to={`/program/${id}`} className="program-card">
            <img
              className="program-card-img"
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="program-card-overlay"></div>

            <div className="program-card-body">
              <div className="program-card-chips">
                <span className="chip">{level}</span>
                <span className="chip">{duration}</span>
              </div>
              <h3 className="program-card-title">{title}</h3>
              <span className="program-card-link">
                Ver programa <Icon name="arrow-right" size={16} />
              </span>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
};

export default Programs;
