import "./Programs.css";
import { useNavigate } from "react-router-dom";

const programs = [
  { id: 1, img: "/images/trainer-1.png", text: "Amigable para Principiantes" },
  { id: 2, img: "/images/trainer-2.png", text: "Moderado a Avanzado" },
  { id: 3, img: "/images/trainer-3.png", text: "Pérdida de Peso" },
  { id: 4, img: "/images/trainer-4.png", text: "Sin Equipos" },
  { id: 5, img: "/images/trainer-5.png", text: "Entrenamiento de Fuerza" },
];

const Programs = () => {
  const navigate = useNavigate();

  return (
    <section id="training" className="program-wrapper">
      <h3 className="program-title">/// Entrenamientos</h3>

      <div className="program-list-div">
        {programs.map((p) => (
          <div
            key={p.id}
            className="program-div"
            onClick={() => navigate(`/program/${p.id}`)}
          >
            <a href="#" className="program-btn">
              Iniciar hoy
            </a>

            <div className="program-img-div">
              <div className="program-img-bg"></div>
              <img className="program-img5" src={p.img} alt={p.text} />
            </div>

            <span className="program-span">{p.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
