import { useState } from "react";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../../hooks/useToast";
import { formatPrice } from "../../utils/format";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import "./Products.css";

const ProductCard = ({ product }) => {
  const { id, name, price, image, sizes } = product;
  const { add, open } = useCart();
  const toast = useToast();
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const [showSizeError, setShowSizeError] = useState(false);

  const handleAdd = () => {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    add(id, size);
    toast(`${name} (${size}) agregado al carrito.`);
  };

  return (
    <article className="card product-card">
      <div className="product-media">
        <img src={image} alt={name} loading="lazy" decoding="async" />
      </div>

      <div className="product-info">
        <div>
          <h3 className="product-name">{name}</h3>
          <p className="product-price">₡{formatPrice(price)}</p>
        </div>

        {sizes.length === 1 ? (
          <div className="size-picker">
            <span className="size-option is-selected is-static">Talla {sizes[0].toLowerCase()}</span>
          </div>
        ) : (
          <fieldset className="size-picker">
            <legend className="visually-hidden">Talla de {name}</legend>
            {sizes.map((option) => (
              <label key={option} className={`size-option ${size === option ? "is-selected" : ""}`}>
                <input
                  type="radio"
                  name={`size-${id}`}
                  value={option}
                  checked={size === option}
                  onChange={() => {
                    setSize(option);
                    setShowSizeError(false);
                  }}
                />
                {option}
              </label>
            ))}
          </fieldset>
        )}
        {showSizeError && (
          <p className="field-error" role="alert">
            <Icon name="alert" size={14} /> Elige una talla
          </p>
        )}

        <div className="product-actions">
          <button type="button" className="gold-btn product-cta" onClick={handleAdd}>
            <Icon name="bag" size={16} /> Agregar
          </button>
          <button
            type="button"
            className="nav-icon-btn product-cart-btn"
            aria-label="Ver carrito"
            title="Ver carrito"
            onClick={open}
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

const Products = () => {
  return (
    <section id="products" className="section">
      <SectionHeader
        eyebrow="Productos"
        title="Viste la marca"
        subtitle="Ropa oficial de Body Control para entrenar con estilo. Haz tu pedido en línea y retíralo en el gimnasio."
      />

      <Reveal stagger className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Reveal>
    </section>
  );
};

export default Products;
