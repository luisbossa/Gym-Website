import "./Plans.css";

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

// SVG como componente JSX
const CheckIcon = () => (
  <svg
    aria-hidden="true"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 12.75l6 6 9-13.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const Plans = () => {
  return (
    <section id="plans" className="plans-section">
      <div className="plans-header">
        <h2 className="plans-title">/// Planes</h2>
      </div>

      <div className="plans-wrapper">
        {planes.map((plan, index) => (
          <div key={index} className="pack-container">
            <div className="header">
              <p className="title">{plan.nombre}</p>
              <div className="price-container">
                <span>₡</span>
                {plan.precio.toLocaleString("es-CR")}
                <span>/mes</span>
              </div>
            </div>

            <div>
              <ul className="lists">
                {plan.beneficios.map((b, i) => (
                  <li key={i} className="list">
                    <span>
                      <CheckIcon />
                    </span>
                    <p>{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="button-container">
              <button className="gold-btn" type="button">
                Comprar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Plans;
