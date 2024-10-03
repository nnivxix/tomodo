import { describe, expect, it, beforeEach, afterEach } from "vitest";

import useCollection from "@/composables/useCollection";

describe("test functionality of collection", function () {
  afterEach(() => {
    const { collections, deleteColllection } = useCollection();
    for (let i = 0; i < collections.value.length; i++) {
      deleteColllection(collections.value[i].id);
    }
  });
  it("should be empty collection", function () {
    const { collections } = useCollection();

    expect(collections.value.length).toEqual(0);
  });
  it("should be success create a new collection", function () {
    const { addCollection, collections } = useCollection();

    addCollection({
      id: "test-12345",
      name: "test",
      description: "",
      created_at: new Date(),
      todos: [],
    });

    expect(collections.value.length).toEqual(1);
  });

  it("should be can edit collection", function () {
    const { addCollection, updateCollection, collections } = useCollection();

    addCollection({
      id: "test-1234x",
      name: "test",
      description: "",
      created_at: new Date(),
      todos: [],
    });

    updateCollection({
      id: "test-1234",
      name: "test edit",
      description: "",
      created_at: new Date(),
      todos: [],
    });

    expect(collections.valueat(0).name).toBe("test edit");
  });

  it("should be can delete collection", function () {
    const { addCollection, deleteColllection, collections } = useCollection();

    addCollection({
      id: "test-1234a",
      name: "test",
      description: "",
      created_at: new Date(),
      todos: [],
    });

    deleteColllection(0);

    expect(collections.value.length).toEqual(0);
  });
});
