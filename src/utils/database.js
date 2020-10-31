import { Database } from "../database";

let _db = new Database();

export function db() {
  return _db;
}

export function resetdb() {
  _db = new Database();
}

export function initdb() {
  Promise.all(
    ["product"].map(table =>
      _db.readKey(table).catch(_ => _db.writeKey([table], []))
    )
  ).then(_ => resetdb());
}
