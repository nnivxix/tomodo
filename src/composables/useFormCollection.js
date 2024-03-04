import { ref } from "vue";
import { customAlphabet } from "nanoid";
import useCollection from "./useCollection";
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
    updateCollection(form.value);
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
    dbCollection.add(collection);

    resetForm();
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
