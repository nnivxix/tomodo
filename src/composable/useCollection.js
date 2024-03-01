import { ref, reactive, toRaw, onMounted, onUpdated, computed } from "vue";
import dbCollection from "../helper/db-collection";

const collections = ref([]);

const useCollection = () => {
  const addCollection = (collection) => {
    collections.value.push(collection);
  };
  const getCollections = async () => {
    collections.value = await dbCollection.index();
  };
  /**
   * Detail Collection
   * @returns {{
   * id: String,
   * name: String,
   * todos: {
   * name: String,
   * priority: String
   * }
   * }} collection
   */
  const getDetailCollection = (id) => {
    return collections.value.find((collection) => collection.id == id);
  };
  /**
   * Add new todo to collection
   * @param {string} collectionId - id of collection
   * @param {string} todo
   */
  const addTodo = (collectionId, todo) => {
    const collection = getDetailCollection(collectionId);
    collection.todos.push(todo);

    const rawCollection = toRaw(collection);

    dbCollection.update(rawCollection);
  };

  onMounted(() => getCollections());

  return {
    collections,
    addCollection,
    getCollections,
    getDetailCollection,
    addTodo,
  };
};

export default useCollection;
