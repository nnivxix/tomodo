<script setup>
import useFormCollection from "../composable/useFormCollection";
const props = defineProps({
  form: Object,
  isEdit: Boolean,
});
</script>

<template>
  <form @submit.prevent="$emit('handleSubmit')">
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
</template>
