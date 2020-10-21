import { clean } from "mastro-elfo-mui";
import { Database } from "../../database";

export const defaultValue = {
  id: null,
  name: "",
  description: "",
  barcode: "",
  price: 0,
  stock: 0,
  _create: 0,
  _update: 0
};

let db = new Database();
const table = "product";

function cleanstr(input) {
  return clean(input, {
    lower: true,
    trim: true,
    deburr: true,
    replace_symbol: " ",
    compact_spaces: true
  });
}

export function resetdb() {
  db = new Database();
}

export function create(data) {
  return db.create(table, data);
}

export function read(id) {
  return db.read(table, id);
}

export function readAll() {
  return db.readAll(table);
}

export function update(id, data) {
  return db.update(table, id, data);
}

export function del(id) {
  return db.delete(table, id);
}

export function search(query) {
  const queries = query.split(" ");
  return readAll(table).then(r =>
    r
      .map(record => {
        const { barcode, name, description } = record;
        const _score = queries.filter(
          q =>
            cleanstr(barcode).indexOf(q) !== -1 ||
            cleanstr(name).indexOf(q) !== -1 ||
            cleanstr(description).indexOf(q) !== -1
        ).length;
        return { ...record, _score };
      })
      .filter(({ _score }) => _score > 0)
      .sort((a, b) => b._score - a._score)
  );
}
