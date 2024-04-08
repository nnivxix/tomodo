import { ref, toRaw, computed } from "vue";
import dbCollection from "@/repositories/db-collection";
/**
 * @typedef {Object} Collection
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string | Date} created_at
 * @property {import('@/composables/useFormTodo').FormTodo[]} todos
 */

/**
 * @type {import('vue').Ref<Collection>}
 */
const collection = ref({
  id: "",
  name: "",
  description: "",
  created_at: "",
  todos: [],
});
/**
 * @type {import('vue').Ref<Collection[]>}
 */
const collections = ref([]);

const useCollection = () => {
  const descriptionCollection = computed(() => {
    return collection.value?.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
  });

  /**
   * @param {Collection} collection
   */
  const addCollection = (collection) => {
    collections.value.push(collection);

    dbCollection.add(collection);
  };
  const getCollections = async () => {
    collections.value = await dbCollection.index();
  };

  /**
   *
   * @param {string} id
   * @returns {Collection}
   */
  const getDetailCollection = (id) => {
    return collections.value.find((collection) => collection.id == id);
  };

  /**
   * @param {string} id
   */
  const deleteColllection = (id) => {
    const index = collections.value.findIndex(
      (collection) => collection.id === id
    );

    collections.value.splice(index, 1);
    dbCollection.delete(id);
  };

  /**
   *
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
    descriptionCollection,
    addCollection,
    getCollections,
    getDetailCollection,
    deleteColllection,
    updateCollection,
  };
};

export default useCollection;
