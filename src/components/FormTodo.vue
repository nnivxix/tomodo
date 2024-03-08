<script setup>
import { Field, ErrorMessage } from "vee-validate";
import useFormTodo from "@/composables/useFormTodo";

const { formTodo, isEditing } = useFormTodo();
</script>
<template>
  <div>
    <Field name="name" v-slot="{ field }">
      <label for="name">Todo</label>
      <input
        id="name"
        type="text"
        v-bind="field"
        class="border w-full border-spacing-1 rounded-md p-1"
      />
      <ErrorMessage name="name" class="text-red-600" />
    </Field>
  </div>
  <div class="rounded-md">
    <Field name="priority" v-slot="{ field }">
      <label for="priority">Priority</label>
      <select
        v-bind="field"
        :value="field.value"
        class="w-full p-3 rounded-lg"
        id="priority"
      >
        <option disabled value="">Please select one priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <ErrorMessage name="priority" class="text-red-600" />
    </Field>
  </div>
  <button
    type="submit"
    class="p-2 mt-2 bg-[#032836] text-center text-white rounded-lg"
  >
    {{ isEditing ? "Update Todo" : "Add Todo" }}
  </button>
</template>
