import { openDB } from "idb";
/**
 * @typedef {import('@/types').Collection} Collection
 */
export const dbPromise = openDB("collection-db", 1, {
  upgrade(database) {
    database.createObjectStore("collections", {
      keyPath: "id",
    });
  },
});

const indexedDB = {
  async index() {
    return (await dbPromise).getAll("collections");
  },
  /**
   * @param {Collection} collection
   * @returns {Promise<Collection>}
   */
  async create(collection) {
    return (await dbPromise).add("collections", collection);
  },

  /**
   * @param {Collection} collection
   * @returns {Promise<Collection>}
   */
  async update(collection) {
    return (await dbPromise).put("collections", collection);
  },

  /**
   * @param {string} id
   * @returns {Promise<Collection>}
   */
  async delete(id) {
    return (await dbPromise).delete("collections", id);
  },

  /**
   * @param {string} id
   * @returns {Promise<Collection>}
   */
  async find(id) {
    return (await dbPromise).get("collections", id);
  },
};

export default indexedDB;
