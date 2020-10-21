import { pluralize } from "mastro-elfo-mui";

export default function subheader(results) {
  if (!results) return "";
  return `${results.length} ${pluralize(
    results.length,
    "prodotto trovato",
    "prodotti trovati"
  )}`;
}
