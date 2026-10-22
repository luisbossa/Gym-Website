export const plans = [
  {
    id: 1,
    name: "Plan Inicial",
    price: 18500,
    benefits: [
      "Acceso ilimitado al gimnasio",
      "Clases grupales básicas (yoga, spinning)",
      "1 sesión de evaluación física",
      "Soporte básico por WhatsApp",
    ],
  },
  {
    id: 2,
    name: "Plan Intermedio",
    price: 25000,
    benefits: [
      "Acceso completo a todas las sucursales",
      "Clases premium (crossfit, boxeo, pilates)",
      "3 sesiones con entrenador personal",
      "Descuentos en productos del gimnasio",
    ],
  },
  {
    id: 3,
    name: "Plan Avanzado",
    price: 32000,
    featured: true, // se destaca como "Recomendado" en la sección de planes
    benefits: [
      "Acceso 24/7 a todas las sedes",
      "Entrenamiento personalizado ilimitado",
      "Plan nutricional mensual",
      "App exclusiva con seguimiento de progreso",
    ],
  },
  {
    id: 4,
    name: "Plan Elite",
    price: 38500,
    benefits: [
      "Entrenamiento personalizado VIP",
      "Nutricionista y fisioterapeuta incluidos",
      "Acceso a spa y área de masajes",
      "Camiseta y botella oficial del gimnasio",
    ],
  },
];

export const getPlanById = (id) => plans.find((plan) => plan.id === Number(id));
