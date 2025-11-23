import "./Gallery.css";

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section">
      <h2 className="gallery-title">/// Galería</h2>

      <div className="main-grid">
        <div className="gallery-grid-1">
          <img
            src="/images/photo-1.jpg"
            className="gallery-item-img"
            alt="photo 1"
          />
          <img
            src="/images/gym-place.jpg"
            className="gallery-item-img"
            alt="photo 4"
          />
          <img
            src="/images/photo-2.jpg"
            className="gallery-item-img"
            alt="photo 5"
          />
          <img
            src="/images/photo-5.jpg"
            className="gallery-item-img"
            alt="photo 6"
          />
        </div>
        <div className="gallery-grid-2">
          <img
            src="/images/photo-11.jpg"
            className="gallery-item-img"
            alt="photo 2"
          />
          <img
            src="/images/photo-8.webp"
            className="gallery-item-img"
            alt="photo 3"
          />
          <img
            src="/images/photo-4.jpg"
            className="gallery-item-img"
            alt="photo 7"
          />
          <img
            src="/images/photo-10.jpg"
            className="gallery-item-img"
            alt="photo 8"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
