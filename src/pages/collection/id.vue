<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, toRaw, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import useTodo from "@/composables/useTodo";
import useFormTodo from "@/composables/useFormTodo";
import exportCollection from "@/utils/export-collection";
import { default as model } from "@/models/collection";

const store = await model;
const route = useRoute();
const router = useRouter();

// const { collection, collections } = useCollection();

const collection = await store.find(route.params.id);

const { addTodo, markTodo, editTodo, deleteTodo, doneTodos, todos } = useTodo();
const { formTodo, isEditing, resetForm: resetFormTodo } = useFormTodo();
const vFormTodo = useForm({
  validationSchema: {
    name: yup.string().required().min(3).label("todo name"),
    priority: yup.string().required().label("priority"),
  },
});

/**
 * @typedef {import('@/types').Todo} Todo
 */

/** @type {import('vue').Ref<Todo>} */
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

/** @param {Todo} values */
const submitUpdateTodo = (values) => {
  editTodo(values);
  resetFormTodo();
  selectedTodo.value = {};
};

/** @param {import('@/types').Todo} values */
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

/** @param {number} index */
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

/** @param {number} index */
const handleMarkTodo = (index) => {
  if (isEditing.value) {
    resetFormTodo();
    resetVForm();
  }
  selectedTodo.value = {};
  markTodo(index);
  vFormTodo.setErrors({});
};

/** @param {string} id */
const handleDeleteCollection = async (id) => {
  const question = confirm("Are you sure delete this collection?");
  if (question) {
    store.delete(id);

    setTimeout(async () => {
      await router.push("/");
    }, 1000);
  }
};

onMounted(async () => {
  resetFormTodo();
  vFormTodo.setValues({
    ...formTodo.value,
  });
});
</script>
<template>
  <div
    class="grid grid-cols-5 gap-4 relative h-auto md:h-auto"
    v-if="!!collection"
  >
    <div class="border col-span-full md:col-span-3 p-3 rounded-md mb-3">
      <h1 class="text-2xl py-1">{{ collection.name }}</h1>
      <hr />
      <p
        v-if="!!collection.description"
        class="text-lg pb-3 whitespace-pre-line"
      >
        {{ collection.description }}
      </p>
      <p v-else class="text-gray-500 pb-3">no description</p>
      <!-- <ProgressBar
          :totalTodos="todos.length"
          :totalDoneTodos="doneTodos.length"
        /> -->
      <!-- <p class="font-semibold">
          You have {{ todos?.length }} / {{ doneTodos?.length }}
          {{ todos.length > 1 ? "todos" : "todo" }}
        </p> -->
    </div>
    <!-- Actions -->
    <div class="flex gap-3 col-span-full md:col-span-3 flex-wrap my-5">
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

    <!-- List -->
    <div
      class="md:mb-0 order-last col-span-full md:col-span-3 overflow-y-scroll md:h-[70vh] h-[42vh] scroll-bar border p-3 rounded-md"
    >
      <!-- <TodoItem
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          :isSelected="selectedTodo.id === todo.id"
          @handleMarkTodo="handleMarkTodo(index)"
          @selectTodo="selectTodo(index)"
          @deleteTodo="deleteTodo(index)"
        /> -->
    </div>
    <FormTodo
      class="col-span-full md:col-start-4 md:row-start-1 md:row-end-4"
      @submitTodo="submitTodo"
    />
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
