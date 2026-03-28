import { useParams, useNavigate } from "react-router-dom";
import "./Checkout.css";

const planes = {
  1: { nombre: "Plan Inicial", precio: 18500 },
  2: { nombre: "Plan Intermedio", precio: 25000 },
  3: { nombre: "Plan Avanzado", precio: 32000 },
  4: { nombre: "Plan Elite", precio: 38500 },
};

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Checkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = planes[planId];

  if (!plan) return <h2>Plan no encontrado</h2>;

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <button className="checkout-back" onClick={() => navigate("/")}>
          <BackIcon />
        </button>

        <div className="checkout-card">
          <h1 className="checkout-title">Finalizar Compra</h1>

          <div className="checkout-plan">
            <h2>{plan.nombre}</h2>
            <p>₡{plan.precio.toLocaleString("es-CR")} / mes</p>
          </div>

          <form className="checkout-form">
            <div className="checkout-group">
              <input type="text" required />
              <label>Nombre completo</label>
            </div>

            <div className="checkout-group">
              <input type="email" required />
              <label>Correo electrónico</label>
            </div>

            <div className="checkout-group">
              <input type="text" required />
              <label>Número de tarjeta</label>
            </div>

            <div className="checkout-row">
              <div className="checkout-group">
                <input type="text" required />
                <label>MM/AA</label>
              </div>

              <div className="checkout-group">
                <input type="text" required />
                <label>CVV</label>
              </div>
            </div>

            <div className="checkout-btn-container">
              <button type="submit" className="gold-btn">
                Pagar ahora
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
