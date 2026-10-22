import { business } from "./business";

const scheduleText = business.schedule
  .map(({ days, hours }) => `${days}: ${hours}`)
  .join(" · ");

export const faq = [
  {
    question: "¿Necesito experiencia previa para empezar?",
    answer:
      "No. El programa Amigable para Principiantes está pensado para empezar desde cero: 4 semanas, 3 días por semana, enfocado en técnica y en crear el hábito.",
  },
  {
    question: "¿Cuáles son los horarios del gimnasio?",
    answer: scheduleText,
  },
  {
    question: "¿Dónde están ubicados?",
    answer: business.address,
  },
  {
    question: "¿Qué incluye cada plan?",
    answer:
      "Todos los planes incluyen acceso al gimnasio. Los planes superiores suman clases premium, sesiones con entrenador personal, plan nutricional y más. Puedes comparar el detalle en la sección de Planes.",
  },
  {
    question: "¿Puedo entrenar desde casa?",
    answer:
      "Sí. El programa Sin Equipos está diseñado para entrenar en casa usando solo tu peso corporal.",
  },
  {
    question: "¿Cómo me inscribo?",
    answer: `Elige tu plan en la sección de Planes y completa el proceso, o llámanos al ${business.phone} y te ayudamos.`,
  },
];
