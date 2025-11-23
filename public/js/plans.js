const planes = [
  {
    nombre: "Plan Inicial",
    precio: 18500,
    beneficios: [
      "Acceso ilimitado al gimnasio",
      "Clases grupales básicas (yoga, spinning)",
      "1 sesión de evaluación física",
      "Soporte básico por WhatsApp",
    ],
  },
  {
    nombre: "Plan Intermedio",
    precio: 25000,
    beneficios: [
      "Acceso completo a todas las sucursales",
      "Clases premium (crossfit, boxeo, pilates)",
      "3 sesiones con entrenador personal",
      "Descuentos en productos del gimnasio",
    ],
  },
  {
    nombre: "Plan Avanzado",
    precio: 32000,
    beneficios: [
      "Acceso 24/7 a todas las sedes",
      "Entrenamiento personalizado ilimitado",
      "Plan nutricional mensual",
      "App exclusiva con seguimiento de progreso",
    ],
  },
  {
    nombre: "Plan Elite",
    precio: 38500,
    beneficios: [
      "Entrenamiento personalizado VIP",
      "Nutricionista y fisioterapeuta incluidos",
      "Acceso a spa y área de masajes",
      "Camiseta y botella oficial del gimnasio",
    ],
  },
];

const plansWrapper = document.querySelector("#plans-wrapper");

plansWrapper.innerHTML = "";

const checkIcon = `
  <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
       fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
  </svg>`;

plansWrapper.innerHTML = planes
  .map(
    (plan) => `
  <div class="pack-container">
    <div class="header">
      <p class="title">${plan.nombre}</p>
      <div class="price-container">
        <span>₡</span>${plan.precio.toLocaleString("es-CR")}
        <span>/mes</span>
      </div>
    </div>
    <div>
      <ul class="lists">
        ${plan.beneficios
          .map(
            (b) => `
          <li class="list">
            <span>${checkIcon}</span>
            <p>${b}</p>
          </li>`
          )
          .join("")}
      </ul>
    </div>
    <div class="button-container">
      <button class="plans-btn" type="button">Comprar ahora</button>
    </div>
  </div>
`
  )
  .join("");
