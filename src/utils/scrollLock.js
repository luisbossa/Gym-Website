// Contador para que varios overlays (menú, modal, carrito, galería) puedan bloquear el scroll a la vez
let locks = 0;

export const lockScroll = () => {
  locks += 1;
  document.body.classList.add("no-scroll");
};

export const unlockScroll = () => {
  locks = Math.max(0, locks - 1);
  if (locks === 0) document.body.classList.remove("no-scroll");
};
