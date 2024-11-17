import indexedDB from "@/repositories/indexedDB";

const model = async (connection = "indexedDB") => {
  let store = null;
  if (connection === "indexedDB") {
    store = indexedDB;
  }

  // Check if store is set
  if (!store) {
    throw new Error("Store not found.");
  }

  return {
    all: async () => {
      return await store.index();
    },
    find: (id) => {
      return store.find(id);
    },
    create: (collection) => {
      store.create(collection);
    },
    update: async (id, collection) => {
      await store.update(collection);
    },
    delete: (id) => {
      store.delete(id);
    },
  };
};

export default model;
