<script setup>
import useFormTodo from "../composable/useFormTodo";

const { formTodo, isEditing } = useFormTodo();
</script>
<template>
  <form
    class="border rounded-lg md:h-auto border-1 flex flex-col gap-3 col-span-full bottom-0 left-0 bg-white md:col-span-1 w-full p-3"
    @submit.prevent="$emit('submitTodo')"
  >
    <div>
      <label for="todo">Todo</label>
      <input
        id="todo"
        type="text"
        v-model="formTodo.name"
        class="border w-full border-spacing-1 rounded-md p-1"
      />
    </div>
    <div class="rounded-md">
      <label for="priority">Priority</label>
      <select
        v-model="formTodo.priority"
        class="w-full p-3 rounded-lg"
        id="priority"
      >
        <option disabled value="">Please select one priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <button
      type="submit"
      class="p-2 mt-2 bg-[#032836] text-center text-white rounded-lg"
    >
      {{ isEditing ? "Update Todo" : "Add Todo" }}
    </button>
  </form>
</template>

<style lang="scss" scoped></style>
