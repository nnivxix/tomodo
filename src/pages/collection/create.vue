<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { customAlphabet } from "nanoid";
import useCollection from "../../composable/useCollection";
import dbCollection from "../../helper/db-collection";

const route = useRoute();
const router = useRouter();
const { addCollection, updateCollection } = useCollection();

const isEdit = route.fullPath.includes("edit");

const collection = ref({});
const form = ref({
  name: collection.value.name ?? "",
  description: collection.value.description ?? "",
  todos: collection.value.todos ?? [],
});

function handleSubmit() {
  if (isEdit) {
    editCurrentCollection();
    return;
  }
  addNewCollection();
}

function editCurrentCollection() {
  form.value.id = collection.value.id;
  updateCollection(form.value);
  router.push({
    path: `/collection/${collection.value.id}`,
  });
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

  form.value = {
    name: "",
    description: "",
    todos: [],
  };
  router.push({
    path: "/",
  });
}

onMounted(async () => {
  if (isEdit) {
    const dataCollection = await dbCollection.show(route.params.id);
    collection.value = dataCollection;
    if (!!dataCollection) {
      form.value = {
        name: dataCollection.name,
        description: dataCollection.description,
        todos: dataCollection.todos,
      };
      return;
    }
    router.push("/create");
  }
});
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <form @submit.prevent="handleSubmit">
      <label for="collection_name" class="text-m-form-label"
        >Collection Name</label
      >
      <input
        v-model="form.name"
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        name="collection_name"
        id="collection_name"
        placeholder="Go To Market"
        type="text"
        autofocus
      />
      <hr class="text-dark-one" />
      <label for="collection_description" class="text-m-form-label"
        >Collection Description</label
      >
      <textarea
        v-model="form.description"
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        id="collection_description"
      />
      <hr class="text-dark-one" />

      <button class="p-5 my-4 bg-[#032836] text-center text-white rounded-lg">
        {{ isEdit ? "Update Collection" : "Add New Collection" }}
      </button>
    </form>
  </div>
</template>

<style scoped></style>
