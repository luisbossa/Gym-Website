const crcFormatter = new Intl.NumberFormat("es-CR");
const dateFormatter = new Intl.DateTimeFormat("es-CR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatPrice = (amount) => crcFormatter.format(amount);

export const formatDate = (isoDate) => dateFormatter.format(new Date(isoDate));

export const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export const createOrderId = (prefix) =>
  `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export const addMonths = (isoDate, months) => {
  const date = new Date(isoDate);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
};
