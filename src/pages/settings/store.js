// Loads a value from localStorage
export function load(key, defaultValue) {
  // If key has not been set
  if (!localStorage.hasOwnProperty(key)) {
    return defaultValue;
  }
  // Otherwise
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return defaultValue;
  }
}

// Store a value to localStorage
export function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Store/Load currency symbol
const currency = "currency";

export function loadCurrency() {
  return load(currency, "€");
}

export function storeCurrency(value) {
  return store(currency, value);
}
