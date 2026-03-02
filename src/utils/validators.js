export const validateCpf = (value) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return false;
  }

  const stringValue = value.toString();
  if (/[^\d.-]/.test(stringValue)) {
    return false;
  }

  const numbersOnly = stringValue.replace(/\D/g, "");

  if (numbersOnly.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(numbersOnly)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let index = 1; index <= 9; index++) {
    sum =
      sum + parseInt(numbersOnly.substring(index - 1, index)) * (11 - index);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(numbersOnly.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let index = 1; index <= 10; index++) {
    sum =
      sum + parseInt(numbersOnly.substring(index - 1, index)) * (12 - index);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(numbersOnly.substring(10, 11))) {
    return false;
  }

  return true;
};

export const validateCnpj = (value) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return false;
  }

  const stringValue = value.toString();
  if (/[^\d.\-/]/.test(stringValue)) {
    return false;
  }

  const numbersOnly = stringValue.replace(/\D/g, "");

  if (numbersOnly.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(numbersOnly)) {
    return false;
  }

  let length = numbersOnly.length - 2;
  let numbers = numbersOnly.substring(0, length);
  let digits = numbersOnly.substring(length);
  let sum = 0;
  let position = length - 7;

  for (let index = length; index >= 1; index--) {
    sum += numbers.charAt(length - index) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length = length + 1;
  numbers = numbersOnly.substring(0, length);
  sum = 0;
  position = length - 7;

  for (let index = length; index >= 1; index--) {
    sum += numbers.charAt(length - index) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateDate = (date) => {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const dateObject = new Date(date);
  return dateObject instanceof Date && !isNaN(dateObject.getTime());
};
