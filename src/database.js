import { remote } from "electron";
import { promises } from "fs";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import path from "path";

export const filename = path.join(
  remote.app.getPath("appData"),
  "teepee",
  "teepee.json"
);

export const stat = () => promises.stat(filename);

export class Database {
  constructor() {
    this.separator = "/";
    const config = new Config(filename, true, false, this.separator);
    this.db = new JsonDB(config);

    this.readKey("lastid")
      .then(lastid => (this.lastid = parseInt(lastid)))
      .catch(_ => {
        this.lastid = 0;
        return this.writeKey("lastid", 0);
      });
  }

  create(table, data) {
    if (table === "lastid")
      return Promise.reject(new Error('Can\'t use "lastid" as table'));
    return this._nextId().then(id =>
      this.writeKey([table, id], { ...data, id, _create: new Date() })
    );
  }

  read(table, id) {
    return this.readKey([table, id]);
  }

  readAll(table) {
    return this.readKey([table]).then(r => Object.values(r));
  }

  update(table, id, data) {
    return this.writeKey([table, id], { ...data, _update: new Date() });
  }

  delete(table, id) {
    if (table === "lastid")
      return Promise.reject(new Error('Can\'t delete "lastid"'));
    return this.deleteKey([table, id]);
  }

  writeKey(key, value) {
    return new Promise((resolve, reject) => {
      try {
        const _key = this._join(key);
        this.db.push(_key, value);
        resolve(value);
      } catch (err) {
        reject(err);
      }
    });
  }

  readKey(key) {
    return new Promise((resolve, reject) => {
      try {
        const _key = this._join(key);
        const value = this.db.getData(_key);
        resolve(value);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteKey(key) {
    return this.readKey(key).then(data => {
      const _key = this._join(key);
      this.db.delete(_key);
      return data;
    });
  }

  _nextId() {
    return this.writeKey("lastid", this.lastid + 1).then(
      () => (this.lastid += 1)
    );
  }

  _isArray(obj) {
    return typeof obj === "object" && obj.join;
  }

  _join(list) {
    if (typeof list === "string") {
      return list[0] === this.separator ? list : `${this.separator}${list}`;
    } else if (this._isArray(list)) {
      return ["", ...list].join(this.separator);
    } else {
      throw new Error(`Invalid key type ${typeof list}`);
    }
  }
}
