import { pluralize } from "mastro-elfo-mui";

export default function subheader(results) {
  console.warn("This function is deprecated, use 'Translation' instead");
  if (!results) return "";
  return `${results.length} ${pluralize(
    results.length,
    "prodotto trovato",
    "prodotti trovati"
  )}`;
}
