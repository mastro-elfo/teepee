// const palette = "palette";
//
// export function storePalette(obj) {
//   localStorage.setItem(palette, JSON.stringify(obj));
// }
//
// export function loadPalette(defaultValue) {
//   try {
//     return JSON.parse(localStorage.getItem(palette));
//   } catch {
//     return defaultValue;
//   }
// }

export function load(key, defaultValue) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return defaultValue;
  }
}

export function store(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const currency = "currency";

export function loadCurrency() {
  return load(currency, "€");
}

export function storeCurrency(value) {
  return store(currency, value);
}
