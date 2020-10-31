import { clean } from "mastro-elfo-mui";

export default function cleanstr(input) {
  return clean(input, {
    lower: true,
    trim: true,
    deburr: true,
    replace_symbol: " ",
    compact_spaces: true
  });
}
