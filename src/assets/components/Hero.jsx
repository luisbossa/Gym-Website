import "./Hero.css";

const Hero = () => {
  return (
    <section id="hero" className="hero-wrapper">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Alcanza Tu Mejor Versión</h1>
        </div>
      </div>

      <div className="hero-video">
        <div className="hero-video-div">
          <a href="#plans" className="hero-button">
            Comienza Ahora
          </a>
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          aria-label="Ambiente de gimnasio"
          className="hero-bg-video"
        >
          <source src="videos/video-hero.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    </section>
  );
};

export default Hero;
