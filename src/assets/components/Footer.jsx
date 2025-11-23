import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-logo"></div>

      <p className="footer-text">
        En Body Control nos dedicamos a ayudarte a alcanzar tus objetivos de
        forma saludable y segura. Contamos con programas de entrenamiento
        personalizados, instructores certificados y un ambiente motivador para
        todas las edades.
      </p>

      <div className="footer-wrapper">
        <div className="footer-schedule">
          <h3 className="footer-title">Horarios</h3>
          <p className="footer-p">
            Domingo: Cerrado
            <br />
            Lunes a Viernes: 5 a.m. – 9 p.m.
            <br />
            Sábado: 6 a.m. – 2 p.m.
          </p>
        </div>

        <div className="footer-location">
          <h3 className="footer-title">Dirección</h3>
          <p className="footer-p">
            170 metros al norte de Correos de Costa Rica, Provincia de Alajuela,
            San Ramón Centro.
          </p>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title">Contacto</h3>
          <div className="footer-p">
            <img src="/images/icon_call.svg" alt="Teléfono" className="icon" />{" "}
            +(506) 2447 0146
          </div>
          <div className="footer-p">
            <img
              src="/images/icon_email.svg"
              alt="Correo electrónico"
              className="icon"
            />{" "}
            bodycontrolsr@gmail.com
          </div>

          <div className="footer-socials">
            <a href="#">
              <img src="/images/inst.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/images/face.svg" alt="Facebook" />
            </a>
            <a href="#">
              <img src="/images/yt.svg" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
