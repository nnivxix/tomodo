import { ref } from "vue";
import { customAlphabet } from "nanoid";
import useCollection from "@/composables/useCollection";

const { addCollection, updateCollection } = useCollection();
/**
 * @typedef {Object} FormCollection
 * @property {?string} id
 * @property {string} name
 * @property {string} description
 * @property {import('@/composables/useFormTodo').Todo[]} todos
 */

/**
 * @type {import('vue').Ref<FormCollection>}
 */
const collection = ref({
  name: "",
  description: "",
  todos: [],
});

const form = ref({
  name: collection.value.name,
  description: collection.value.description,
  todos: collection.value.todos,
});

const useFormCollection = () => {
  const resetForm = () => {
    form.value = {
      name: "",
      description: "",
      todos: [],
    };
  };

  function editCurrentCollection() {
    form.value.id = collection.value.id;
    const updatedCollection = updateCollection(form.value);
    return updatedCollection;
  }
  function addNewCollection() {
    const nanoid = customAlphabet("1234567890abcdef", 10);
    /**
     * @type {FormCollection}
     */
    const collection = {
      id: nanoid(),
      name: form.value.name,
      description: form.value.description,
      todos: [],
    };

    addCollection(collection);
    resetForm();
    return collection;
  }

  return {
    form,
    collection,
    resetForm,
    addNewCollection,
    editCurrentCollection,
  };
};
export default useFormCollection;
