export const programs = [
  {
    id: 1,
    title: "Amigable para Principiantes",
    level: "Principiante",
    duration: "4 semanas",
    image: "/images/trainer-1.webp",
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
  {
    id: 2,
    title: "Moderado a Avanzado",
    level: "Intermedio",
    duration: "6 semanas",
    image: "/images/trainer-2.webp",
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
  {
    id: 3,
    title: "Pérdida de Peso",
    level: "Intermedio",
    duration: "5 semanas",
    image: "/images/trainer-3.webp",
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
  {
    id: 4,
    title: "Sin Equipos",
    level: "Principiante",
    duration: "4 semanas",
    image: "/images/trainer-4.webp",
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
  {
    id: 5,
    title: "Entrenamiento de Fuerza",
    level: "Avanzado",
    duration: "8 semanas",
    image: "/images/trainer-5.webp",
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
];

export const getProgramById = (id) =>
  programs.find((program) => program.id === Number(id));
