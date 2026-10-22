import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../../hooks/useToast";
import { createOrderId, formatPrice } from "../../utils/format";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import Icon from "../ui/Icon";
import "../ui/Modal.css";
import "./CartDrawer.css";

const CartDrawer = () => {
  const { items, total, count, maxQuantity, setQuantity, remove, clear, close } = useCart();
  const { requireAuth, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && close();

    lockScroll();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  const placeOrder = () => {
    const order = {
      id: createOrderId("PED"),
      type: "products",
      createdAt: new Date().toISOString(),
      status: "Listo para retirar",
      total,
      items: items.map(({ product, size, quantity }) => ({
        name: product.name,
        size,
        quantity,
        price: product.price,
      })),
    };

    updateUser((user) => ({ ...user, orders: [order, ...user.orders] }));
    clear();
    close();
    toast(`Pedido ${order.id} registrado. Retíralo y págalo en el gimnasio.`);
    navigate("/cuenta");
  };

  return (
    <div className="drawer-backdrop" onMouseDown={close}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="drawer-header">
          <h2>
            Tu carrito <span>({count})</span>
          </h2>
          <button type="button" className="modal-close drawer-close" aria-label="Cerrar carrito" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <Icon name="bag" size={40} strokeWidth={1.5} />
            <p>Tu carrito está vacío.</p>
            <button type="button" className="outline-btn" onClick={close}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer-items">
              {items.map(({ key, product, size, quantity }) => (
                <li key={key} className="drawer-item">
                  <div className="drawer-item-media">
                    <img src={product.image} alt="" />
                  </div>

                  <div className="drawer-item-info">
                    <p className="drawer-item-name">{product.name}</p>
                    <p className="drawer-item-meta">Talla: {size}</p>

                    <div className="qty" role="group" aria-label={`Cantidad de ${product.name}`}>
                      <button
                        type="button"
                        aria-label="Quitar uno"
                        onClick={() => setQuantity(key, quantity - 1)}
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        aria-label="Agregar uno"
                        disabled={quantity >= maxQuantity}
                        onClick={() => setQuantity(key, quantity + 1)}
                      >
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="drawer-item-side">
                    <p>₡{formatPrice(product.price * quantity)}</p>
                    <button
                      type="button"
                      className="text-btn is-danger"
                      aria-label={`Eliminar ${product.name}`}
                      onClick={() => remove(key)}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer-footer">
              <div className="drawer-total">
                <span>Total</span>
                <strong>₡{formatPrice(total)}</strong>
              </div>
              <p className="drawer-note">
                Pago y retiro en el gimnasio. Te reservamos tus productos al confirmar el pedido.
              </p>
              <button
                type="button"
                className="gold-btn drawer-submit"
                onClick={() => requireAuth(placeOrder)}
              >
                Confirmar pedido
              </button>
              <button type="button" className="text-btn drawer-clear" onClick={clear}>
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
