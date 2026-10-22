export const digitsOnly = (value) => value.replace(/\D/g, "");

export const formatCardNumber = (value) =>
  digitsOnly(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

export const formatExpiry = (value) => {
  const digits = digitsOnly(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

// Algoritmo de Luhn: detecta números de tarjeta mal digitados
export const isValidCardNumber = (value) => {
  const digits = digitsOnly(value);
  if (digits.length < 13 || digits.length > 16) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const isValidExpiry = (value) => {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};

export const isValidCvv = (value) => /^\d{3,4}$/.test(value);

export const getCardBrand = (value) => {
  const digits = digitsOnly(value);
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "American Express";
  return "Tarjeta";
};
