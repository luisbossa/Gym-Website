import { useCallback, useEffect, useState } from "react";
import { galleryImages } from "../../data/gallery";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Gallery.css";

const total = galleryImages.length;

const Lightbox = ({ index, onClose, onNavigate }) => {
  const { src, alt } = galleryImages[index];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    };

    lockScroll();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNavigate]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      onClick={onClose}
    >
      <button type="button" className="lightbox-btn lightbox-close" aria-label="Cerrar" onClick={onClose}>
        <Icon name="close" />
      </button>

      <button
        type="button"
        className="lightbox-btn lightbox-prev"
        aria-label="Imagen anterior"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(-1);
        }}
      >
        <Icon name="chevron-left" />
      </button>

      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img src={src} alt={alt} />
        <figcaption>
          {alt} · {index + 1} / {total}
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox-btn lightbox-next"
        aria-label="Imagen siguiente"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(1);
        }}
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  );
};

const Gallery = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback(
    (step) => setOpenIndex((current) => (current + step + total) % total),
    []
  );

  return (
    <section id="gallery" className="section">
      <SectionHeader
        eyebrow="Galería"
        title="Conoce el gimnasio"
        subtitle="Un vistazo a nuestras instalaciones y al ambiente que se vive cada día."
      />

      <Reveal stagger className="gallery-grid">
        {galleryImages.map(({ src, alt }, index) => (
          <button
            key={src}
            type="button"
            className="gallery-item"
            aria-label={`Ampliar: ${alt}`}
            onClick={() => setOpenIndex(index)}
          >
            <img src={src} alt={alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </Reveal>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onNavigate={navigate} />
      )}
    </section>
  );
};

export default Gallery;
