import { useEffect, useRef, useState } from "react";

// Anima la entrada del contenido al aparecer en pantalla.
// Con `stagger`, anima en cascada a los hijos directos en vez de al contenedor.
const Reveal = ({
  as = "div",
  stagger = false,
  delay = 0,
  className = "",
  style,
  children,
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const baseClass = stagger ? "reveal-stagger" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${baseClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
