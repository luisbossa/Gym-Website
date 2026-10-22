import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página vuelve arriba; los enlaces con hash los maneja HashLink
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
