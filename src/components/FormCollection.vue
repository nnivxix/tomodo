<script setup>
import { Field, ErrorMessage } from "vee-validate";

/**
 * @typedef {import('@/composables/useFormCollection').FormCollection} Form
 * @typedef {Boolean} IsEdit
 * @typedef {{form: Form, isEdit:IsEdit}} PropsForm
 */

/** @type {PropsForm} */
const props = defineProps({
  form: Object,
  isEdit: Boolean,
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <Field name="name" type="text" v-slot="{ field }">
      <label for="collection_name" class="text-m-form-label capitalize"
        >Collection {{ field.name }}</label
      >
      <input
        v-bind="field"
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        name="collection_name"
        id="collection_name"
        placeholder="Go To Market"
        type="text"
        autofocus
      />
      <ErrorMessage name="name" class="text-red-600" />
    </Field>
  </div>
  <div class="flex flex-col gap-2">
    <Field name="description" type="text" v-slot="{ field }">
      <label for="collection_description" class="text-m-form-label capitalize"
        >Collection {{ field.name }}</label
      >
      <textarea
        v-bind="field"
        class="text-m-sub-1 bg-gray-50 px-4 border-l-transparent border-r-transparent border-t-transparent border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2"
        id="collection_description"
      />
      <ErrorMessage name="description" />
    </Field>
  </div>

  <button class="p-5 my-4 bg-[#032836] text-center text-white rounded-lg">
    {{ isEdit ? "Update Collection" : "Add New Collection" }}
  </button>
</template>
