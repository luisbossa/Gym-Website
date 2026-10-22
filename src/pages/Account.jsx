import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getPlanById } from "../data/plans";
import { getProgramById } from "../data/programs";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { formatDate, formatPrice, getInitials } from "../utils/format";
import Icon from "../components/ui/Icon";
import "./Account.css";

const MembershipCard = ({ membership, onCancel }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const plan = membership && getPlanById(membership.planId);

  if (!plan) {
    return (
      <section className="card account-card">
        <h2 className="account-card-title">Membresía</h2>
        <div className="account-empty">
          <p>No tienes un plan activo.</p>
          <HashLink smooth to="/#plans" className="gold-btn">
            Ver planes
          </HashLink>
        </div>
      </section>
    );
  }

  return (
    <section className="card account-card membership-card">
      <div className="account-card-head">
        <h2 className="account-card-title">Membresía</h2>
        <span className="chip">Activa</span>
      </div>

      <p className="membership-plan">{plan.name}</p>
      <p className="membership-price">₡{formatPrice(plan.price)} / mes</p>

      <dl className="account-details">
        <div>
          <dt>Inicio</dt>
          <dd>{formatDate(membership.startedAt)}</dd>
        </div>
        <div>
          <dt>Próximo cobro</dt>
          <dd>{formatDate(membership.nextBillingAt)}</dd>
        </div>
        <div>
          <dt>Método de pago</dt>
          <dd>
            {membership.cardBrand} •••• {membership.cardLast4}
          </dd>
        </div>
      </dl>

      {isConfirming ? (
        <div className="account-confirm" role="alert">
          <p>¿Seguro que quieres cancelar? Tu plan dejará de estar activo de inmediato.</p>
          <div>
            <button type="button" className="outline-btn is-danger" onClick={onCancel}>
              Sí, cancelar
            </button>
            <button type="button" className="text-btn" onClick={() => setIsConfirming(false)}>
              No, mantener plan
            </button>
          </div>
        </div>
      ) : (
        <div className="account-actions">
          <HashLink smooth to="/#plans" className="outline-btn">
            Cambiar plan
          </HashLink>
          <button type="button" className="text-btn is-danger" onClick={() => setIsConfirming(true)}>
            Cancelar membresía
          </button>
        </div>
      )}
    </section>
  );
};

const ProfileCard = ({ user, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name").trim();
    if (name) onSave(name);
  };

  return (
    <section className="card account-card">
      <h2 className="account-card-title">Perfil</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="profile-name">Nombre</label>
          <input id="profile-name" name="name" defaultValue={user.name} minLength={2} required />
        </div>
        <div className="field">
          <label htmlFor="profile-email">Correo electrónico</label>
          <input id="profile-email" value={user.email} readOnly disabled />
        </div>
        <button type="submit" className="outline-btn">
          Guardar cambios
        </button>
      </form>
    </section>
  );
};

const ProgramsCard = ({ enrollments }) => {
  const items = Object.entries(enrollments)
    .map(([id, enrollment]) => ({ program: getProgramById(id), enrollment }))
    .filter(({ program }) => program);

  return (
    <section className="card account-card account-wide">
      <h2 className="account-card-title">Mis programas</h2>

      {items.length === 0 ? (
        <div className="account-empty">
          <p>Aún no te has inscrito en ningún programa.</p>
          <HashLink smooth to="/#training" className="outline-btn">
            Explorar entrenamientos
          </HashLink>
        </div>
      ) : (
        <ul className="account-programs">
          {items.map(({ program, enrollment }) => {
            const done = enrollment.completed.length;
            const total = program.exercises.length;

            return (
              <li key={program.id}>
                <Link to={`/program/${program.id}`} className="account-program">
                  <img src={program.image} alt="" loading="lazy" />
                  <div className="account-program-info">
                    <p className="account-program-title">{program.title}</p>
                    <p className="account-muted">
                      Desde {formatDate(enrollment.enrolledAt)} · {done}/{total} ejercicios
                    </p>
                    <div className="routine-progress">
                      <span style={{ width: `${(done / total) * 100}%` }}></span>
                    </div>
                  </div>
                  <Icon name="chevron-right" size={20} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

const OrdersCard = ({ orders }) => (
  <section className="card account-card account-wide">
    <h2 className="account-card-title">Historial de compras</h2>

    {orders.length === 0 ? (
      <div className="account-empty">
        <p>Aún no tienes compras.</p>
        <HashLink smooth to="/#products" className="outline-btn">
          Ver productos
        </HashLink>
      </div>
    ) : (
      <ul className="account-orders">
        {orders.map((order) => (
          <li key={order.id} className="account-order">
            <div>
              <p className="account-order-id">
                {order.id}
                <span className="chip">{order.status}</span>
              </p>
              <p className="account-muted">
                {formatDate(order.createdAt)} ·{" "}
                {order.items
                  .map(({ name, size, quantity }) =>
                    size ? `${name} (${size}) ×${quantity}` : name
                  )
                  .join(", ")}
              </p>
            </div>
            <strong>₡{formatPrice(order.total)}</strong>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const Account = () => {
  const { user, openAuth, logout, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  if (!user) {
    return (
      <section className="page page-empty">
        <p className="eyebrow">/// Mi cuenta</p>
        <h1 className="section-heading">Inicia sesión para ver tu cuenta</h1>
        <p className="section-subtitle">
          Gestiona tu membresía, sigue tus programas y revisa tus pedidos.
        </p>
        <div className="page-empty-actions">
          <button type="button" className="gold-btn" onClick={() => openAuth("login")}>
            Iniciar sesión
          </button>
          <button type="button" className="outline-btn" onClick={() => openAuth("register")}>
            Crear cuenta
          </button>
        </div>
      </section>
    );
  }

  const handleLogout = () => {
    logout();
    toast("Sesión cerrada. ¡Hasta pronto!");
    navigate("/");
  };

  const cancelMembership = () => {
    updateUser((current) => ({ ...current, membership: null }));
    toast("Tu membresía fue cancelada.");
  };

  const saveName = (name) => {
    updateUser((current) => ({ ...current, name }));
    toast("Datos actualizados.");
  };

  return (
    <section className="page account-page">
      <header className="account-header">
        <span className="account-avatar">{getInitials(user.name)}</span>
        <div>
          <p className="eyebrow">/// Mi cuenta</p>
          <h1 className="account-name">Hola, {user.name.split(" ")[0]}</h1>
          <p className="account-muted">
            {user.email} · Miembro desde {formatDate(user.createdAt)}
          </p>
        </div>
        <button type="button" className="outline-btn account-logout" onClick={handleLogout}>
          <Icon name="logout" size={16} /> Cerrar sesión
        </button>
      </header>

      <div className="account-grid">
        <MembershipCard membership={user.membership} onCancel={cancelMembership} />
        <ProfileCard user={user} onSave={saveName} />
        <ProgramsCard enrollments={user.programs} />
        <OrdersCard orders={user.orders} />
      </div>
    </section>
  );
};

export default Account;
