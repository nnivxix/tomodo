import { ref, toRaw, computed } from "vue";
import dbCollection from "@/repositories/db-collection";
import model from "@/repositories/adapter";
/**
 * @typedef {import('@/types').Collection} Collection
 * @typedef {import('vue').Ref<Collection>} CollectionRef
 * @typedef {import('vue').Ref<Collection[]>} CollectionsRef
 */

/** @type {CollectionRef} */
const collection = ref({
  id: "",
  name: "",
  description: "",
  created_at: "",
  todos: [],
});

/**
 * Work on
 * 1. Memory
 * 2. DB
 */

/** @type {CollectionsRef} */
const collections = ref([]);
const store = await model();

const useCollection = () => {
  /** @param {Collection} collection */
  const addCollection = (collection) => {
    collections.value.push(collection);

    store.create(collection);
  };
  const getCollections = async () => {
    collections.value = await store.all();
  };

  /**
   * @param {string} id
   * @returns {Collection}
   */
  const getDetailCollection = async (id) => {
    const collection = (await model()).find(id);

    return collection;
    // return collections.value.find((collection) => collection.id == id);
  };

  /** @param {string} id */
  const deleteColllection = (id) => {
    const index = collections.value.findIndex(
      (collection) => collection.id === id
    );

    collections.value.splice(index, 1);
    dbCollection.delete(id);
  };

  /**
   * @param {Collection} collection
   * @returns {Collection}
   */
  const updateCollection = async (collection) => {
    const index = collections.value.findIndex(
      (coll) => coll.id === collection.id
    );

    collections.value.splice(index, 1, collection);

    const rawCollection = toRaw(collection);
    dbCollection.update(rawCollection);

    return rawCollection;
  };

  return {
    collections,
    collection,
    addCollection,
    getCollections,
    getDetailCollection,
    deleteColllection,
    updateCollection,
  };
};

export default useCollection;
