import dbCollection from "@/repositories/db-collection";
import { toRaw, computed } from "vue";
import useCollection from "@/composables/useCollection";

/** @typedef {import('@/types')} Todo */

const { collection, getDetailCollection } = useCollection();

const useTodo = () => {
  const todos = computed(() => collection.value.todos);
  const doneTodos = computed(() =>
    collection.value.todos?.filter((todo) => todo.isDone === true)
  );

  /** @param {Todo} todo */
  const addTodo = (todo) => {
    const { todos } = getDetailCollection(collection.value.id);

    todos.push(todo);
    collection.value.todos = todos;

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  /** @param {number} index */
  const markTodo = (index) => {
    const todo = collection.value.todos.at(index);

    todo.isDone = !todo.isDone;
    collection.value.todos.splice(index, 1, todo);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  /** @param {Todo} newTodo */
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

  /** @param {number} index */
  const deleteTodo = (index) => {
    const { todos } = getDetailCollection(collection.value.id);

    collection.value.todos.splice(index, 1);
    todos.splice(index, 1);

    const rawCollection = toRaw(collection.value);

    dbCollection.update(rawCollection);
  };

  return {
    todos,
    doneTodos,
    addTodo,
    markTodo,
    editTodo,
    deleteTodo,
  };
};

export default useTodo;
