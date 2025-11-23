import "./Programs.css";

const Programs = () => {
  return (
    <section id="training" className="program-wrapper">
      <h3 className="program-title">/// Entrenamientos</h3>

      <div className="program-list-div">
        <div className="program-div">
          <a href="#" className="program-btn">
            Iniciar hoy
          </a>
          <div className="program-img-div">
            <div className="program-img-bg"></div>
            <img
              className="program-img1"
              src="/images/trainer-1.jpeg"
              alt="Programa 1"
            />
          </div>
          <span className="program-span">Amigable para Principiantes</span>
        </div>

        <div className="program-div">
          <a href="#" className="program-btn">
            Iniciar hoy
          </a>
          <div className="program-img-div">
            <div className="program-img-bg"></div>
            <img
              className="program-img2"
              src="/images/trainer-2.jpeg"
              alt="Programa 2"
            />
          </div>
          <span className="program-span">Moderado a Avanzado</span>
        </div>

        <div className="program-div">
          <a href="#" className="program-btn">
            Iniciar hoy
          </a>
          <div className="program-img-div">
            <div className="program-img-bg"></div>
            <img
              className="program-img3"
              src="/images/trainer-3.jpeg"
              alt="Programa 3"
            />
          </div>
          <span className="program-span">Pérdida de Peso</span>
        </div>

        <div className="program-div">
          <a href="#" className="program-btn">
            Iniciar hoy
          </a>
          <div className="program-img-div">
            <div className="program-img-bg"></div>
            <img
              className="program-img4"
              src="/images/trainer-4.jpeg"
              alt="Programa 4"
            />
          </div>
          <span className="program-span">Sin Equipos</span>
        </div>

        <div className="program-div">
          <a href="#" className="program-btn">
            Iniciar hoy
          </a>
          <div className="program-img-div">
            <div className="program-img-bg"></div>
            <img
              className="program-img5"
              src="/images/trainer-5.jpeg"
              alt="Programa 5"
            />
          </div>
          <span className="program-span">Entrenamiento de Fuerza</span>
        </div>
      </div>
    </section>
  );
};

export default Programs;
