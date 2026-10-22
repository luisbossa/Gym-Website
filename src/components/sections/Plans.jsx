import { Link } from "react-router-dom";
import { plans } from "../../data/plans";
import { useAuth } from "../../hooks/useAuth";
import { formatPrice } from "../../utils/format";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Plans.css";

const PlanCard = ({ plan, currentPlanId }) => {
  const { id, name, price, benefits, featured } = plan;
  const isCurrent = id === currentPlanId;
  // Si el usuario ya tiene plan, se destaca ese en lugar del recomendado
  const isHighlighted = isCurrent || (featured && !currentPlanId);

  return (
    <article className={`card plan-card ${isHighlighted ? "is-featured" : ""}`}>
      {isHighlighted && (
        <span className="plan-badge">{isCurrent ? "Tu plan actual" : "Recomendado"}</span>
      )}

      <header className="plan-header">
        <h3 className="plan-name">{name}</h3>
        <p className="plan-price">
          <span className="plan-currency">₡</span>
          {formatPrice(price)}
          <span className="plan-period">/mes</span>
        </p>
      </header>

      <ul className="plan-benefits">
        {benefits.map((benefit) => (
          <li key={benefit} className="plan-benefit">
            <span className="plan-check">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Link to="/cuenta" className="outline-btn plan-cta">
          Ver mi membresía
        </Link>
      ) : (
        <Link
          to={`/checkout/${id}`}
          className={isHighlighted ? "gold-btn plan-cta" : "outline-btn plan-cta"}
        >
          {currentPlanId ? "Cambiar a este plan" : "Comprar ahora"}
        </Link>
      )}
    </article>
  );
};

const Plans = () => {
  const { user } = useAuth();
  const currentPlanId = user?.membership?.planId;

  return (
    <section id="plans" className="section">
      <SectionHeader
        eyebrow="Planes"
        title="Elige tu membresía"
        subtitle="Precios mensuales en colones. Empieza con el plan que mejor se adapte a ti y sube de nivel cuando quieras."
        align="center"
      />

      <Reveal stagger className="plans-grid">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} currentPlanId={currentPlanId} />
        ))}
      </Reveal>
    </section>
  );
};

export default Plans;
