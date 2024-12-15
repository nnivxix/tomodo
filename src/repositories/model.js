import indexedDB from "./indexedDB";
import supabase from "./supabase";
import config from "@/configs/database";
/**
 *
 * @param {'indexedDB' | 'supabase'} connection
 * @param {string} table
 * @returns
 */
const model = async ({ connection, table }) => {
  let store = null;

  console.log(connection, table);

  if (connection === "indexedDB") {
    store = indexedDB(table);
  }
  if (connection === "supabase") {
    store = supabase(table);
  }

  // Check if store is set
  if (!store) {
    throw new Error("Store not found.");
  }

  return {
    all: async () => {
      return await store.index();
    },
    find: (key) => {
      return store.find(key);
    },
    create: (values) => {
      const data = store.create(values);
      return data;
    },
    update: async (key, values) => {
      await store.update(key, values);
    },
    delete: (key) => {
      store.delete(key);
    },
  };
};

export default model;
