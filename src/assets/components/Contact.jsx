import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h2 className="contact-title">/// Contáctanos</h2>
      </div>

      <div className="contact-content">
        <form className="contact-form">
          <label htmlFor="name" className="input-label">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            required
          />

          <label htmlFor="email" className="input-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="correo@gmail.com"
            required
          />

          <label htmlFor="message" className="input-label">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Escribe tu mensaje..."
            rows="6"
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </form>

        <div className="contact-image">
          <img src="/images/contact-img.jpg" alt="Imagen de contacto" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
