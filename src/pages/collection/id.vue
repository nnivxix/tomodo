<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, toRaw, onMounted } from "vue";
import { Form, useForm } from "vee-validate";
import * as yup from "yup";

import useCollection from "@/composables/useCollection";
import useTodo from "@/composables/useTodo";
import useFormTodo from "@/composables/useFormTodo";
import TodoItem from "@/components/TodoItem.vue";
import FormTodo from "@/components/FormTodo.vue";
import dbCollections from "@/repositories/db-collection";
import ProgressBar from "@/components/ProgressBar.vue";

const route = useRoute();
const router = useRouter();
const { deleteColllection, collection, descriptionCollection } =
  useCollection();
const { addTodo, markTodo, editTodo, deleteTodo, doneTodos, todos } = useTodo();
const { formTodo, isEditing, resetForm } = useFormTodo();
const formTodoValidate = useForm({
  initialValues: {
    name: formTodo.value.name,
    priority: formTodo.value.priority,
  },
  validationSchema: {},
});

const selectedTodo = ref({});
const schema = yup.object({
  name: yup.string().required(),
  priority: yup.string().required(),
});

const submitUpdateTodo = (values) => {
  editTodo(values);
  resetForm();
  selectedTodo.value = {};
  console.log("edit");
};
const submitAddTodo = (values) => {
  addTodo(values);
  resetForm();
  selectedTodo.value = {};
  console.log("add");
};
const submitTodo = (values) => {
  console.log(values);
  formTodoValidate.resetForm();
  return;
  if (isEditing.value) {
    submitUpdateTodo(values);
    return;
  }
  submitAddTodo(values);
  return;
};
const selectTodo = (index) => {
  isEditing.value = true;
  selectedTodo.value = collection.value.todos.at(index);

  // console.log(...toRaw(formTodo.value));
  formTodo.value = toRaw(selectedTodo.value);
};

const handleMarkTodo = (index) => {
  if (isEditing.value) resetForm();
  selectedTodo.value = {};
  markTodo(index);
};
const handleDeleteCollection = (id) => {
  /**TODO
   * Change to vue modal
   */
  const question = confirm("Are you sure delete this collection?");
  if (question) {
    deleteColllection(id);
    router.push("/");
    return;
  }
  return;
};

onMounted(async () => {
  collection.value = await dbCollections.show(route.params.id);
  // resetForm();
});
</script>
<template>
  <div
    class="grid grid-cols-3 gap-4 relative h-auto md:h-auto"
    v-if="!!collection"
  >
    <div class="col-span-full md:col-span-2">
      <div class="border p-3 rounded-md mb-3">
        <h1 class="text-2xl py-1">{{ collection.name }}</h1>
        <hr />
        <div
          v-if="!!collection.description"
          class="text-lg"
          v-html="descriptionCollection"
        ></div>
        <div v-else class="text-gray-500">no description</div>
      </div>
      <ProgressBar
        :totalTodos="todos.length"
        :totalDoneTodos="doneTodos.length"
      />
      <p class="font-semibold">
        You have {{ todos?.length }} / {{ doneTodos?.length }}
        {{ todos.length > 1 ? "todos" : "todo" }}
      </p>
      <div class="flex gap-3">
        <button
          class="bg-red-600 text-white p-3 rounded-md my-2"
          @click="handleDeleteCollection(collection.id)"
        >
          Delete Collection
        </button>
        <button
          @click="router.push(`/collection/${collection.id}/edit`)"
          class="bg-gray-600 text-white p-3 rounded-md my-2"
        >
          Edit Collection
        </button>
      </div>

      <div
        class="md:mb-0 overflow-y-scroll md:h-[80vh] h-[55vh] scroll-bar border p-3 rounded-md"
      >
        <TodoItem
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          :isSelected="selectedTodo.id === todo.id"
          @handleMarkTodo="handleMarkTodo(index)"
          @selectTodo="selectTodo(index)"
          @deleteTodo="deleteTodo(index)"
        />
      </div>
    </div>
    <Form
      @submit="submitTodo"
      :initial-values="formTodo"
      :validation-schema="schema"
    >
      <FormTodo />
    </Form>
  </div>
  <!-- TODO: make it stylish -->
  <div v-else>Collection is Not Found</div>
</template>

<style>
.scroll-bar {
  scrollbar-width: thin;

  border-radius: 5px;
  scrollbar-color: #1d2e35;
}

/* Chrome, Edge, and Safari */
.scroll-bar::-webkit-scrollbar {
  width: 3px;
  border-radius: 5px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: #1d2e35;
  border-radius: 5px;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #1d2e35;
  border-radius: 14px;
  border: 3px solid #1d2e35;
}
</style>
