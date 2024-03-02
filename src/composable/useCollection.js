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
   * description: String,
   * created_at: Date,
   * todos: {
   * name: String,
   * priority: String,
   * isDone: Boolean,
   * created_at: Date,
   * }[]
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

  /**
   * mark todo as done or not
   * @param {string} collectionId - id of collection
   * @param {number} index
   */
  const markTodo = (collectionId, index) => {
    const collection = getDetailCollection(collectionId);
    const todo = collection.todos.at(index);

    todo.isDone = !todo.isDone;
    collection.todos.splice(index, 1, todo);

    const rawCollection = toRaw(collection);

    dbCollection.update(rawCollection);
  };

  /**
   * Edit todo in collection - wip
   * @param {string} collectionId - id of collection
   * @param {number} index
   * @param {{
   * id: string,
   * name: string,
   * priority: string,
   * isDone: boolean,
   * created_at: Date,
   * }} newTodo
   */
  const editTodo = (collectionId, newTodo) => {
    const collection = getDetailCollection(collectionId);
    const index = collection.todos.findIndex((todo) => todo.id === newTodo.id);
    collection.todos.splice(index, 1, newTodo);

    const rawCollection = toRaw(collection);

    dbCollection.update(rawCollection);
  };
  /**
   *
   * @param {string} collectionId
   * @param {number} index
   * @description still wip
   */
  const deleteTodo = (collectionId, index) => {
    const collection = getDetailCollection(collectionId);
    collection.todos.splice(index, 1);

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
    markTodo,
    editTodo,
    deleteTodo,
  };
};

export default useCollection;
