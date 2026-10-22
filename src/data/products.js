const clothingSizes = ["S", "M", "L", "XL"];

export const products = [
  { id: "cap", name: "Gorra", price: 12000, image: "/images/cap.webp", sizes: ["Única"] },
  { id: "long-shirt", name: "Camisa larga", price: 18500, image: "/images/t-shirt-1.webp", sizes: clothingSizes },
  { id: "tank-top", name: "Tirantes", price: 9500, image: "/images/t-shirt-2.webp", sizes: clothingSizes },
  { id: "joggers", name: "Joggers", price: 22000, image: "/images/joggers.webp", sizes: clothingSizes },
];

export const getProductById = (id) => products.find((product) => product.id === id);
