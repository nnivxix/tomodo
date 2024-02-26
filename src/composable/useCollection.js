import { ref, onMounted, onUpdated, computed } from "vue";
import dbCollection from "../helper/db-collection";

const collections = ref([]);
const useCollection = () => {
  const addCollection = (collection) => {
    collections.value.push(collection);
  };
  const getCollections = async () => {
    collections.value = await dbCollection.index();
  };
  const getDetailCollection = (id) => {
    return collections.value.find((collection) => collection.id == id);
  };

  onMounted(() => getCollections());

  return {
    collections,
    addCollection,
    getCollections,
    getDetailCollection,
  };
};

export default useCollection;
