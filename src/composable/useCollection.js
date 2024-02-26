import { ref, onMounted, onUpdated, computed } from "vue";
import dbCollection from "../helper/db-collection";

const useCollection = () => {
  const collections = ref([]);

  const getCollections = async () => {
    collections.value = await dbCollection.index();
  };

  onMounted(() => getCollections());

  return {
    collections,
    getCollections,
  };
};

export default useCollection;
