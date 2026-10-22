import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./contexts";
import { getProductById } from "../data/products";
import { readStorage, writeStorage } from "../utils/storage";
import CartDrawer from "../components/cart/CartDrawer";

const CART_KEY = "bc_cart";
const MAX_QUANTITY = 10;

const itemKey = (productId, size) => `${productId}:${size}`;

const CartProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => readStorage(CART_KEY, []));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => writeStorage(CART_KEY, entries), [entries]);

  const add = useCallback((productId, size) => {
    setEntries((list) => {
      const key = itemKey(productId, size);
      const existing = list.find((entry) => entry.key === key);
      if (existing) {
        return list.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: Math.min(entry.quantity + 1, MAX_QUANTITY) }
            : entry
        );
      }
      return [...list, { key, productId, size, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    setEntries((list) =>
      quantity <= 0
        ? list.filter((entry) => entry.key !== key)
        : list.map((entry) =>
            entry.key === key ? { ...entry, quantity: Math.min(quantity, MAX_QUANTITY) } : entry
          )
    );
  }, []);

  const remove = useCallback(
    (key) => setEntries((list) => list.filter((entry) => entry.key !== key)),
    []
  );

  const clear = useCallback(() => setEntries([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    // Se descartan productos que ya no existen en el catálogo
    const items = entries
      .map((entry) => ({ ...entry, product: getProductById(entry.productId) }))
      .filter((item) => item.product);

    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
      maxQuantity: MAX_QUANTITY,
      isOpen,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    };
  }, [entries, isOpen, add, setQuantity, remove, clear, open, close]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {isOpen && <CartDrawer />}
    </CartContext.Provider>
  );
};

export default CartProvider;
