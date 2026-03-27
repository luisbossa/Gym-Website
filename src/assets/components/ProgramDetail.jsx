import { useParams } from "react-router-dom";
import "./ProgramDetail.css";

const programsData = {
  1: {
    title: "Amigable para Principiantes",
    level: "Principiante",
    duration: "4 semanas",
    image: "/images/trainer-1.png",
    description:
      "Programa ideal para iniciar en el mundo del fitness, mejorar condición física y crear hábitos sólidos desde cero.",
    days: "3 días por semana",
    benefits: [
      "Mejora resistencia",
      "Quema grasa",
      "Aprende técnica",
      "Activa todo el cuerpo",
    ],
    exercises: [
      { name: "Sentadillas", reps: "3 x 12" },
      { name: "Flexiones", reps: "3 x 10" },
      { name: "Plancha", reps: "3 x 30s" },
      { name: "Zancadas", reps: "3 x 10 c/pierna" },
    ],
    tips: [
      "Descansa entre 60-90 segundos",
      "Mantén buena técnica",
      "Hidrátate bien",
      "No te saltes el calentamiento",
    ],
  },

  2: {
    title: "Moderado a Avanzado",
    level: "Intermedio",
    duration: "6 semanas",
    image: "/images/trainer-2.png",
    description:
      "Entrenamiento enfocado en fuerza y volumen muscular para usuarios con experiencia previa en gimnasio.",
    days: "5 días por semana",
    benefits: [
      "Aumenta masa muscular",
      "Más fuerza",
      "Mayor resistencia",
      "Mejor rendimiento",
    ],
    exercises: [
      { name: "Peso muerto", reps: "4 x 8" },
      { name: "Press banca", reps: "4 x 10" },
      { name: "Dominadas", reps: "4 x 6" },
      { name: "Press militar", reps: "3 x 10" },
    ],
    tips: [
      "Controla los pesos",
      "Prioriza la técnica",
      "Duerme mínimo 7 horas",
      "Sigue una dieta adecuada",
    ],
  },

  3: {
    title: "Pérdida de Peso",
    level: "Intermedio",
    duration: "5 semanas",
    image: "/images/trainer-3.png",
    description:
      "Programa diseñado para quemar grasa de forma eficiente combinando cardio y entrenamiento funcional.",
    days: "4-5 días por semana",
    benefits: [
      "Quema grasa rápida",
      "Mejora cardiovascular",
      "Tonifica músculos",
      "Aumenta energía",
    ],
    exercises: [
      { name: "Burpees", reps: "3 x 12" },
      { name: "Jump squats", reps: "3 x 15" },
      { name: "Mountain climbers", reps: "3 x 30s" },
      { name: "Cuerda", reps: "3 x 1 min" },
    ],
    tips: [
      "Mantén alta intensidad",
      "Reduce azúcares",
      "Descansa bien",
      "Sé constante",
    ],
  },

  4: {
    title: "Sin Equipos",
    level: "Principiante",
    duration: "4 semanas",
    image: "/images/trainer-4.png",
    description:
      "Entrena en casa sin necesidad de máquinas, utilizando solo tu peso corporal.",
    days: "3-4 días por semana",
    benefits: [
      "Entrena en casa",
      "Mejora movilidad",
      "Fortalece core",
      "Sin costo de equipo",
    ],
    exercises: [
      { name: "Flexiones", reps: "3 x 12" },
      { name: "Sentadillas", reps: "3 x 15" },
      { name: "Planchas", reps: "3 x 40s" },
      { name: "Fondos en silla", reps: "3 x 10" },
    ],
    tips: [
      "Controla el movimiento",
      "Mantén postura correcta",
      "Respira adecuadamente",
      "Entrena con constancia",
    ],
  },

  5: {
    title: "Entrenamiento de Fuerza",
    level: "Avanzado",
    duration: "8 semanas",
    image: "/images/trainer-5.png",
    description:
      "Programa enfocado en el desarrollo de fuerza máxima con ejercicios compuestos y progresión de carga.",
    days: "5-6 días por semana",
    benefits: [
      "Incremento de fuerza",
      "Mayor volumen muscular",
      "Mejor rendimiento físico",
      "Progreso medible",
    ],
    exercises: [
      { name: "Sentadilla con barra", reps: "5 x 5" },
      { name: "Peso muerto", reps: "5 x 5" },
      { name: "Press banca", reps: "5 x 5" },
      { name: "Dominadas lastradas", reps: "4 x 6" },
    ],
    tips: [
      "Calienta correctamente",
      "Aumenta peso progresivamente",
      "Descansa 2 min entre sets",
      "Cuida tu alimentación",
    ],
  },
};

const ProgramDetail = () => {
  const { id } = useParams();
  const program = programsData[id];

  if (!program) return <h2>Programa no encontrado</h2>;

  return (
    <section className="program-page">
      <div className="program-hero">
        <img src={program.image} alt={program.title} />
        <div className="program-overlay"></div>

        <div className="program-hero-content">
          <h1>{program.title}</h1>
          <p>
            {program.level} • {program.duration}
          </p>
        </div>
      </div>

      <div className="program-detail-container">
        <div className="program-info">
          <div className="info-card">
            <span>Nivel</span>
            <h3>{program.level}</h3>
          </div>
          <div className="info-card">
            <span>Duración</span>
            <h3>{program.duration}</h3>
          </div>
          <div className="info-card">
            <span>Frecuencia</span>
            <h3>{program.days}</h3>
          </div>
        </div>

        <div className="program-description">
          <h2>Descripción</h2>
          <p>{program.description}</p>
        </div>

        <div className="program-benefits">
          <h2>Beneficios</h2>
          <div className="benefits-list">
            {program.benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="program-exercises">
          <h2>Ejercicios</h2>
          <div className="exercise-list">
            {program.exercises.map((ex, index) => (
              <div key={index} className="exercise-card">
                <h4>{ex.name}</h4>
                <span>{ex.reps}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="program-tips">
          <h2>Recomendaciones</h2>
          <ul>
            {program.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="program-detail-div">
          <button className="gold-btn">Comenzar programa</button>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetail;
