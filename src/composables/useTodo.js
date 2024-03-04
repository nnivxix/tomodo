import dbCollection from "../repositories/db-collection";
import { toRaw, computed } from "vue";
import useCollection from "./useCollection";

const { collection, getDetailCollection } = useCollection();

const useTodo = () => {
  const doneTodos = computed(() =>
    collection.value.todos?.filter((todo) => todo.isDone === true)
  );
  /**
   * Add new todo to collection
   * @param {{
   * id: string,
   * name: string,
   * priority: string,
   * isDone: boolean,
   * created_at: Date,
   * }} todo
   */
  const addTodo = (todo) => {
    const { todos } = getDetailCollection(collection.value.id);

    collection.value.todos.push(todo);
    todos.push(todo);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  /**
   * mark todo as done or not
   * @param {number} index
   */
  const markTodo = (index) => {
    const todo = collection.value.todos.at(index);

    todo.isDone = !todo.isDone;
    collection.value.todos.splice(index, 1, todo);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  /**
   * Edit todo in collection
   * @param {{
   * id: string,
   * name: string,
   * priority: string,
   * isDone: boolean,
   * created_at: Date,
   * }} newTodo
   */
  const editTodo = (newTodo) => {
    const { todos } = getDetailCollection(collection.value.id);
    const index = collection.value.todos.findIndex(
      (todo) => todo.id === newTodo.id
    );

    collection.value.todos.splice(index, 1, newTodo);
    todos.splice(index, 1, newTodo);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };
  /**
   *
   * @param {number} index
   * @description still wip
   */
  const deleteTodo = (index) => {
    const { todos } = getDetailCollection(collection.value.id);

    collection.value.todos.splice(index, 1);
    todos.splice(index, 1);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  return {
    doneTodos,
    addTodo,
    markTodo,
    editTodo,
    deleteTodo,
  };
};

export default useTodo;
