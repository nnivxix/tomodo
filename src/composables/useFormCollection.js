import { ref } from "vue";
import { customAlphabet } from "nanoid";
import useCollection from "@/composables/useCollection";
import dbCollection from "@/repositories/db-collection";

const { addCollection, updateCollection } = useCollection();

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
