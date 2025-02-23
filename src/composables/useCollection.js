import { ref, toRaw, computed } from "vue";
import dbCollection from "@/repositories/db-collection";
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

/** @type {CollectionsRef} */
const collections = ref([]);

const useCollection = () => {
  /** @param {Collection} collection */
  const addCollection = (collection) => {
    collections.value.push(collection);

    dbCollection.add(collection);
  };
  const getCollections = async () => {
    collections.value = await dbCollection.index();
  };

  /**
   * @param {string} id
   * @returns {Collection}
   */
  const getDetailCollection = (id) => {
    return collections.value.find((collection) => collection.id == id);
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
  const updateCollection = (collection) => {
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
