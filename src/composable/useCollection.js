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

  onMounted(() => getCollections());

  return {
    collections,
    addCollection,
    getCollections,
  };
};

export default useCollection;
