import './Products.css'

const Products = () => {
  return (
    <section id="products" className="merch-section">
      <header className="merch-section-header">
        <h2 className="merch-title">/// Productos</h2>
        <a href="#" className="merch-btn">
          Ver más
        </a>
      </header>

      <div className="merch-gallery">
        <article className="merch-item">
          <div className="merch-item-image cap-image"></div>
          <div className="merch-item-info">
            <span className="merch-item-name">Gorra</span>
            <span className="merch-item-price">₡ 12,000</span>
            <button className="merch-item-btn">Comprar</button>
          </div>
        </article>

        <article className="merch-item">
          <div className="merch-item-image shirt1-image"></div>
          <div className="merch-item-info">
            <span className="merch-item-name">Camisa larga</span>
            <span className="merch-item-price">₡ 18,500</span>
            <button className="merch-item-btn">Comprar</button>
          </div>
        </article>

        <article className="merch-item">
          <div className="merch-item-image shirt2-image"></div>
          <div className="merch-item-info">
            <span className="merch-item-name">Tirantes</span>
            <span className="merch-item-price">₡ 9,500</span>
            <button className="merch-item-btn">Comprar</button>
          </div>
        </article>

        <article className="merch-item">
          <div className="merch-item-image bottle-image"></div>
          <div className="merch-item-info">
            <span className="merch-item-name">Joggers</span>
            <span className="merch-item-price">₡ 22,000</span>
            <button className="merch-item-btn">Comprar</button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Products;
