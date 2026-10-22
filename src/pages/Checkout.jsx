import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getPlanById } from "../data/plans";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { addMonths, createOrderId, formatDate, formatPrice } from "../utils/format";
import {
  digitsOnly,
  formatCardNumber,
  formatExpiry,
  getCardBrand,
  isValidCardNumber,
  isValidCvv,
  isValidExpiry,
} from "../utils/card";
import Icon from "../components/ui/Icon";
import "./Checkout.css";

const PROCESSING_DELAY = 1500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, card, expiry, cvv }) => {
  const errors = {};
  if (name.trim().length < 3) errors.name = "Ingresa tu nombre completo.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Ingresa un correo válido.";
  if (!isValidCardNumber(card)) errors.card = "El número de tarjeta no es válido.";
  if (!isValidExpiry(expiry)) errors.expiry = "Fecha inválida o vencida.";
  if (!isValidCvv(cvv)) errors.cvv = "CVV inválido.";
  return errors;
};

const formatters = {
  card: formatCardNumber,
  expiry: formatExpiry,
  cvv: (value) => digitsOnly(value).slice(0, 4),
};

const Field = ({ id, label, error, ...inputProps }) => (
  <div className={`checkout-group ${error ? "has-error" : ""}`}>
    <input
      id={`checkout-${id}`}
      name={id}
      placeholder=" "
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `checkout-${id}-error` : undefined}
      {...inputProps}
    />
    <label htmlFor={`checkout-${id}`}>{label}</label>
    {error && (
      <p id={`checkout-${id}-error`} className="field-error">
        {error}
      </p>
    )}
  </div>
);

const Checkout = () => {
  const { planId } = useParams();
  const plan = getPlanById(planId);
  const { user, requireAuth, updateUser } = useAuth();
  const toast = useToast();

  const [values, setValues] = useState(() => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
    card: "",
    expiry: "",
    cvv: "",
  }));
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [receipt, setReceipt] = useState(null);

  if (!plan) {
    return (
      <section className="page page-empty">
        <h1 className="section-heading">Plan no encontrado</h1>
        <HashLink smooth to="/#plans" className="outline-btn">
          Ver planes
        </HashLink>
      </section>
    );
  }

  const errors = validate(values);
  const errorFor = (field) => (isSubmitted || touched[field] ? errors[field] : undefined);
  const isCurrentPlan = user?.membership?.planId === plan.id && status === "idle";

  const handleChange = (event) => {
    const { name, value } = event.target;
    const format = formatters[name];
    setValues((current) => ({ ...current, [name]: format ? format(value) : value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const processPayment = () => {
    setStatus("processing");

    setTimeout(() => {
      const startedAt = new Date().toISOString();
      const order = {
        id: createOrderId("MEM"),
        type: "membership",
        createdAt: startedAt,
        status: "Pagado",
        total: plan.price,
        items: [{ name: plan.name, quantity: 1, price: plan.price }],
      };
      // Solo se guardan la marca y los últimos 4 dígitos: nunca la tarjeta completa
      const membership = {
        planId: plan.id,
        startedAt,
        nextBillingAt: addMonths(startedAt, 1),
        cardBrand: getCardBrand(values.card),
        cardLast4: digitsOnly(values.card).slice(-4),
      };

      updateUser((current) => ({
        ...current,
        membership,
        orders: [order, ...current.orders],
      }));
      setReceipt({ order, membership });
      setStatus("done");
      toast(`¡Bienvenido al ${plan.name}!`);
    }, PROCESSING_DELAY);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }
    requireAuth(processPayment, "register");
  };

  if (status === "done" && receipt) {
    return (
      <section className="page checkout-page">
        <div className="card checkout-success">
          <span className="checkout-success-icon">
            <Icon name="check" size={32} strokeWidth={3} />
          </span>
          <p className="eyebrow">/// Pago confirmado</p>
          <h1 className="section-heading">¡Bienvenido al {plan.name}!</h1>
          <p className="section-subtitle">
            Tu membresía está activa. Puedes consultar este comprobante cuando quieras
            desde tu cuenta.
          </p>

          <dl className="checkout-receipt">
            <div>
              <dt>Comprobante</dt>
              <dd>{receipt.order.id}</dd>
            </div>
            <div>
              <dt>Monto</dt>
              <dd>₡{formatPrice(plan.price)}</dd>
            </div>
            <div>
              <dt>Método de pago</dt>
              <dd>
                {receipt.membership.cardBrand} •••• {receipt.membership.cardLast4}
              </dd>
            </div>
            <div>
              <dt>Próximo cobro</dt>
              <dd>{formatDate(receipt.membership.nextBillingAt)}</dd>
            </div>
          </dl>

          <div className="page-empty-actions">
            <Link to="/cuenta" className="gold-btn">
              Ir a mi cuenta
            </Link>
            <HashLink smooth to="/#training" className="outline-btn">
              Elegir un programa
            </HashLink>
          </div>
          <p className="checkout-demo-note">
            Modo demostración: no se realizó ningún cargo real.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page checkout-page">
      <HashLink smooth to="/#plans" className="checkout-back">
        <Icon name="arrow-left" size={18} /> Volver a planes
      </HashLink>

      <div className="checkout-grid">
        <aside className="card checkout-summary">
          <p className="eyebrow">/// Tu plan</p>
          <h1 className="checkout-plan-name">{plan.name}</h1>
          <p className="checkout-price">
            ₡{formatPrice(plan.price)} <span>/ mes</span>
          </p>

          <ul className="checkout-benefits">
            {plan.benefits.map((benefit) => (
              <li key={benefit}>
                <Icon name="check" size={16} strokeWidth={3} />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="checkout-total">
            <span>Total mensual</span>
            <strong>₡{formatPrice(plan.price)}</strong>
          </div>
        </aside>

        <div className="card checkout-card">
          <h2 className="checkout-title">Finalizar compra</h2>

          {isCurrentPlan && (
            <p className="checkout-info">
              <Icon name="alert" size={16} /> Ya tienes este plan activo.{" "}
              <Link to="/cuenta">Ver mi membresía</Link>
            </p>
          )}

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <Field
              id="name"
              label="Nombre completo"
              autoComplete="cc-name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errorFor("name")}
            />
            <Field
              id="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errorFor("email")}
            />
            <Field
              id="card"
              label="Número de tarjeta"
              inputMode="numeric"
              autoComplete="cc-number"
              value={values.card}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errorFor("card")}
            />

            <div className="checkout-row">
              <Field
                id="expiry"
                label="MM/AA"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={values.expiry}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errorFor("expiry")}
              />
              <Field
                id="cvv"
                label="CVV"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={values.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errorFor("cvv")}
              />
            </div>

            <button
              type="submit"
              className="gold-btn checkout-submit"
              disabled={status === "processing"}
            >
              {status === "processing" ? (
                <>
                  <span className="spinner" aria-hidden="true"></span> Procesando pago…
                </>
              ) : (
                <>
                  <Icon name="lock" size={16} /> Pagar ₡{formatPrice(plan.price)}
                </>
              )}
            </button>

            <p className="checkout-demo-note">
              Modo demostración: no se realizan cargos reales. Puedes probar con la tarjeta
              4242 4242 4242 4242.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
