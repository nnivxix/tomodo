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
    const nanoid = customAlphabet("1234567890abcdef", 10);
    const data = {
      id: nanoid(),
      collection_name: collection.collection_name,
    };
    return (await dbPromise).add("collections", data);
  },
};

export default dbCollections;
