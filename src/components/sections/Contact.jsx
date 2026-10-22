import { business } from "../../data/business";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Contact.css";

const Contact = () => {
  const { user } = useAuth();
  const toast = useToast();

  // Sin backend: abre el cliente de correo del usuario con el mensaje ya redactado
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = `Consulta de ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`;

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    form.querySelector("#message").value = "";
    toast("Abrimos tu aplicación de correo con el mensaje listo para enviar.");
  };

  return (
    <section id="contact" className="section">
      <SectionHeader
        eyebrow="Contacto"
        title="Visítanos o escríbenos"
        subtitle="Estamos en el centro de San Ramón. Pasa a conocernos o déjanos tu mensaje."
      />

      <div className="contact-grid">
        <Reveal
          as="form"
          key={user?.email ?? "guest"}
          className="card contact-form"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa tu nombre"
              autoComplete="name"
              defaultValue={user?.name}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@gmail.com"
              autoComplete="email"
              defaultValue={user?.email}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="gold-btn contact-submit">
            Enviar mensaje
            <Icon name="arrow-right" size={18} />
          </button>
        </Reveal>

        <Reveal className="contact-aside" delay={120}>
          <ul className="card contact-info">
            <li>
              <span className="contact-info-icon">
                <Icon name="pin" size={20} />
              </span>
              <div>
                <h3>Dirección</h3>
                <p>{business.address}</p>
              </div>
            </li>
            <li>
              <span className="contact-info-icon">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <h3>Teléfono</h3>
                <a href={business.phoneHref}>{business.phone}</a>
              </div>
            </li>
            <li>
              <span className="contact-info-icon">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <h3>Correo</h3>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </li>
            <li>
              <span className="contact-info-icon">
                <Icon name="clock" size={20} />
              </span>
              <div>
                <h3>Horario</h3>
                <dl className="contact-schedule">
                  {business.schedule.map(({ days, hours }) => (
                    <div key={days}>
                      <dt>{days}</dt>
                      <dd>{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>

          <div className="contact-map">
            {/* Visible mientras el mapa carga o si Google Maps está bloqueado en la red */}
            <div className="contact-map-fallback" aria-hidden="true">
              <Icon name="pin" size={28} />
              <span>
                {business.name} · {business.city}
              </span>
            </div>
            <iframe
              title={`Mapa de ${business.name} en ${business.city}`}
              src={business.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a
              href={business.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn contact-map-btn"
            >
              <Icon name="pin" size={16} /> Cómo llegar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
