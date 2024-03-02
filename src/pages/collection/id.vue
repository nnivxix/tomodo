<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, toRaw } from "vue";
import useCollection from "../../composable/useCollection";
import useFormTodo from "../../composable/useFormTodo";
import TodoItem from "../../components/TodoItem.vue";
import FormTodo from "../../components/FormTodo.vue";

const route = useRoute();
const router = useRouter();
const {
  getDetailCollection,
  deleteColllection,
  addTodo,
  markTodo,
  editTodo,
  deleteTodo,
} = useCollection();
const { formTodo, isEditing, resetForm } = useFormTodo();

const collection = computed(() => getDetailCollection(route.params.id));
const doneTodos = computed(() =>
  collection.value.todos.filter((todo) => todo.isDone === true)
);
const selectedTodo = ref({});

const submitTodo = () => {
  if (isEditing.value) {
    editTodo(collection.value.id, formTodo.value);
    resetForm();
    selectedTodo.value = {};
    return;
  }
  addTodo(collection.value.id, formTodo.value);
  resetForm();
  selectedTodo.value = {};
  return;
};
const selectTodo = (index) => {
  isEditing.value = true;
  selectedTodo.value = collection.value.todos.at(index);

  formTodo.value = toRaw(selectedTodo.value);
};

const handleMarkTodo = (collectionId, index) => {
  if (isEditing.value) resetForm();
  selectedTodo.value = {};
  markTodo(collectionId, index);
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
</script>
<template>
  <div
    class="grid grid-cols-3 gap-4 relative h-auto md:h-auto"
    v-if="!!collection"
  >
    <div class="col-span-full md:col-span-2">
      <h1 class="text-2xl">{{ collection.name }}</h1>
      <p class="text-lg">{{ collection.description }}</p>
      <p class="font-semibold">
        You have {{ collection.todos.length }} / {{ doneTodos.length }} todos
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

      <div class="md:mb-0 overflow-y-scroll md:h-[80vh] h-[55vh] scroll-bar">
        <TodoItem
          v-for="(todo, index) in collection.todos"
          :key="index"
          :todo="todo"
          :index="index"
          :collectionId="collection.id"
          :isSelected="selectedTodo.id === todo.id"
          @handleMarkTodo="handleMarkTodo(collection.id, index)"
          @selectTodo="selectTodo(index)"
          @deleteTodo="deleteTodo(collection.id, index)"
        />
      </div>
    </div>
    <FormTodo @submitTodo="submitTodo" />
  </div>
  <div v-else>please wait</div>
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
