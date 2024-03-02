import { openDB } from "idb";
import { customAlphabet } from "nanoid";

const dbPromise = openDB("collection-db", 1, {
  upgrade(database) {
    database.createObjectStore("collections", {
      keyPath: "id",
    });
  },
});

const dbCollections = {
  async index() {
    return (await dbPromise).getAll("collections");
  },
  async add(collection) {
    return (await dbPromise).add("collections", collection);
  },
  async update(collection) {
    return (await dbPromise).put("collections", collection);
  },
  async delete(id) {
    return (await dbPromise).delete("collections", id);
  },
  async show(id) {
    return (await dbPromise).get("collections", id);
  },
};

export default dbCollections;
