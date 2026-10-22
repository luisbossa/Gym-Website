import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NotFound = () => {
  return (
    <section className="page page-empty">
      <p className="eyebrow">/// Error 404</p>
      <h1 className="section-heading">Esta página no existe</h1>
      <p className="section-subtitle">
        Puede que el enlace esté roto o que la página se haya movido.
      </p>
      <div className="page-empty-actions">
        <Link to="/" className="gold-btn">
          Ir al inicio
        </Link>
        <HashLink smooth to="/#plans" className="outline-btn">
          Ver planes
        </HashLink>
      </div>
    </section>
  );
};

export default NotFound;
