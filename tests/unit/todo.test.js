import { describe, expect, it, beforeEach, afterEach } from "vitest";

import useCollection from "@/composables/useCollection";
import useTodo from "@/composables/useTodo";

describe("testing functionality of todo", () => {
  beforeEach(() => {
    const { addCollection } = useCollection();
    addCollection({
      id: "test-1234x",
      name: "test",
      description: "",
      created_at: new Date(),
      todos: [],
    });
  });

  afterEach(() => {
    const { collections, deleteColllection } = useCollection();
    collections.value.forEach((collection) => deleteColllection(collection.id));
    // collections.value = [];
  });

  it("it should be empty todo", function () {
    const { collections } = useCollection();

    const firstCollection = collections.value[0];

    expect(firstCollection.todos.length).to.equal(0);
  });

  it("it should be have one todo", function () {
    const { collections, collection } = useCollection();
    const { addTodo } = useTodo();
    // const firstCollection = collections.value[0];
    collection.value = collections.value[0];

    addTodo({
      id: "todo-123",
      name: "Todo First",
      description: "Todo description",
      priority: "low",
      created_at: new Date(),
    });

    expect(collection.value.todos.length).toEqual(1);
    expect(collection.value.todos[0].name).to.equal("Todo First");
  });

  it("it should be have one todo done ", function () {
    const { collections, collection } = useCollection();
    const { addTodo, markTodo } = useTodo();

    collection.value = collections.value[0];

    addTodo({
      id: "todo-123",
      name: "Todo First",
      description: "Todo description",
      priority: "low",
      created_at: new Date(),
    });
    // get first[index] todo
    markTodo(0);

    expect(collection.value.todos[0].isDone).toBeTruthy();
  });

  it("it should be have one todo updated.", function () {
    const { collections, collection } = useCollection();
    const { addTodo, editTodo } = useTodo();

    collection.value = collections.value[0];

    addTodo({
      id: "todo-123",
      name: "Todo First",
      description: "Todo description",
      priority: "low",
      created_at: new Date(),
    });
    editTodo({
      id: "todo-123",
      name: "Todo First Edited",
      description: "Todo description",
      priority: "low",
      created_at: new Date(),
    });

    expect(collection.value.todos[0].name).toEqual("Todo First Edited");
  });

  it("it should be have one todo deleted.", function () {
    const { collections, collection } = useCollection();
    const { addTodo, deleteTodo } = useTodo();

    collection.value = collections.value[0];

    addTodo({
      id: "todo-123",
      name: "Todo First",
      description: "Todo description",
      priority: "low",
      created_at: new Date(),
    });

    deleteTodo(0);

    expect(collection.value.todos.length).toEqual(0);
  });
});
