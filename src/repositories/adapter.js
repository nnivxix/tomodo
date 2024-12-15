import indexedDB from "./indexedDB";
import supabase from "./supabase";

/**
 *
 * @param {'indexedDB' | 'supabase'} connection
 * @returns
 */
const model = async (connection = "indexedDB") => {
  let store = null;

  if (connection === "indexedDB") {
    store = indexedDB;
  }
  if (connection === "supabase") {
    store = supabase;
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
      store.create(values);
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
