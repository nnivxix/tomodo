import dbCollection from "../helper/db-collection";
import { ref, toRaw, onMounted } from "vue";
import useCollection from "./useCollection";

const { getDetailCollection } = useCollection();

const useTodo = () => {
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

  return {
    addTodo,
    markTodo,
    editTodo,
    deleteTodo,
  };
};

export default useTodo;
