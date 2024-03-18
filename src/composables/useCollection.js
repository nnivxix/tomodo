import { ref, toRaw, computed } from "vue";
import dbCollection from "@/repositories/db-collection";

const collections = ref([]);
const collection = ref({
  id: "",
  name: "",
  description: "",
  created_at: "",
  todos: [],
});
const useCollection = () => {
  const descriptionCollection = computed(() => {
    return collection.value?.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
  });

  const addCollection = (collection) => {
    collections.value.push(collection);

    dbCollection.add(collection);
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
  const deleteColllection = (id) => {
    const index = collections.value.findIndex(
      (collection) => collection.id === id
    );

    collections.value.splice(index, 1);
    dbCollection.delete(id);
  };
  const updateCollection = (collection) => {
    const index = collections.value.findIndex(
      (coll) => coll.id === collection.id
    );

    collections.value.splice(index, 1, collection);
    const rawCollection = toRaw(collection);

    dbCollection.update(rawCollection);
    return rawCollection;
  };

  return {
    collections,
    collection,
    descriptionCollection,
    addCollection,
    getCollections,
    getDetailCollection,
    deleteColllection,
    updateCollection,
  };
};

export default useCollection;
