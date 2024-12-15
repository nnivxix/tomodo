import { openDB } from "idb";
/**
 * @typedef {import('@/types').Collection} Collection
 */
const indexedDB = (table) => {
  const dbPromise = openDB(table, 1, {
    upgrade(database) {
      database.createObjectStore(table, {
        keyPath: "id",
      });
    },
  });
  return {
    async index() {
      return (await dbPromise).getAll(table);
    },
    /**
     * @param {Collection} collection
     * @returns {Promise<Collection>}
     */
    async create(collection) {
      return (await dbPromise).add(table, collection);
    },

    /**
     * @param {Collection} collection
     * @returns {Promise<Collection>}
     */
    async update(key, collection) {
      const values = { id: key, ...collection };
      const db = await dbPromise;
      db.put(table, values);
    },

    /**
     * @param {string} id
     * @returns {Promise<Collection>}
     */
    async delete(id) {
      return (await dbPromise).delete(table, id);
    },

    /**
     * @param {string} id
     * @returns {Promise<Collection>}
     */
    async find(id) {
      return (await dbPromise).get(table, id);
    },
  };
};

export default indexedDB;
