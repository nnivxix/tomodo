<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, toRaw, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

import useCollection from "@/composables/useCollection";
import useTodo from "@/composables/useTodo";
import useFormTodo from "@/composables/useFormTodo";
import TodoItem from "@/components/TodoItem.vue";
import FormTodo from "@/components/FormTodo.vue";
import dbCollections from "@/repositories/db-collection";
import ProgressBar from "@/components/ProgressBar.vue";
import exportCollection from "@/utils/export-collection";

const route = useRoute();
const router = useRouter();
const { deleteColllection, collection, descriptionCollection } =
  useCollection();
const { addTodo, markTodo, editTodo, deleteTodo, doneTodos, todos } = useTodo();
const { formTodo, isEditing, resetForm: resetFormTodo } = useFormTodo();
const vFormTodo = useForm({
  validationSchema: {
    name: yup.string().required().min(3).label("todo name"),
    priority: yup.string().required().label("priority"),
  },
});

const selectedTodo = ref({});
const resetVForm = async () => {
  vFormTodo.setValues({
    id: formTodo.value.id,
    name: formTodo.value.name,
    priority: formTodo.value.priority,
    isDone: false,
    created_at: new Date(),
  });
};
const submitUpdateTodo = (values) => {
  editTodo(values);
  resetFormTodo();
  selectedTodo.value = {};
};
const submitAddTodo = (values) => {
  addTodo(values);
  resetFormTodo();
  selectedTodo.value = {};
};
const submitTodo = async () => {
  const todo = {
    ...toRaw(vFormTodo.values),
  };

  const { validate } = vFormTodo;
  const { valid } = await validate();
  if (!valid) return;

  if (isEditing.value) {
    submitUpdateTodo(todo);
    resetVForm();

    return;
  }
  submitAddTodo(todo);
  resetVForm();

  return;
};
const selectTodo = (index) => {
  isEditing.value = true;

  const todo = toRaw(collection.value.todos.at(index));
  vFormTodo.setErrors({});
  vFormTodo.setValues({
    id: todo.id,
    name: todo.name,
    priority: todo.priority,
    isDone: todo.isDone,
    created_at: todo.created_at,
  });
  selectedTodo.value = todo;
  formTodo.value = todo;
};

const handleMarkTodo = (index) => {
  if (isEditing.value) {
    resetFormTodo();
    resetVForm();
  }
  selectedTodo.value = {};
  markTodo(index);
  vFormTodo.setErrors({});
};

const handleDeleteCollection = (id) => {
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
  resetFormTodo();
  vFormTodo.setValues({
    ...formTodo.value,
  });
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
      <div class="flex gap-3 flex-wrap my-5">
        <button
          class="bg-red-600 text-white p-3 rounded-md"
          @click="handleDeleteCollection(collection.id)"
        >
          Delete Collection
        </button>
        <button
          @click="router.push(`/collection/${collection.id}/edit`)"
          class="bg-gray-600 text-white p-3 rounded-md"
          type="button"
        >
          Edit Collection
        </button>
        <button
          id="export-collection"
          class="bg-orange-600 text-white p-3 rounded-md"
          @click="exportCollection(collection)"
        >
          Export Collection
        </button>
      </div>

      <div
        class="md:mb-0 overflow-y-scroll md:h-[70vh] h-[42vh] scroll-bar border p-3 rounded-md"
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
    <FormTodo @submitTodo="submitTodo" />
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
