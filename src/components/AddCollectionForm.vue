<script setup>
import { reactive, ref } from "vue";
import dbCollection from "../helper/db-collection";
const form = ref({
  id: 2,
  collection_name: "",
});

function addNewCollection() {
  console.log(form.value);
  dbCollection.add(form.value);
}
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <h1>Collection</h1>
    <form @submit.prevent="addNewCollection">
      <label for="collection_name" class="text-m-form-label"
        >Collection Name</label
      >
      <input
        v-model="form.collection_name"
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        name="collection_name"
        id="collection_name"
        placeholder="Go To Market"
        type="text"
        autofocus
      />
      <hr class="text-dark-one" />

      <button class="p-5 my-4 bg-[#032836] text-center text-white rounded-lg">
        Add New Collection
      </button>
    </form>
  </div>
</template>

<style scoped></style>
