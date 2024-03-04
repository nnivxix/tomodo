<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, toRaw, onMounted } from "vue";
import useCollection from "../../composable/useCollection";
import useTodo from "../../composable/useTodo";
import useFormTodo from "../../composable/useFormTodo";
import TodoItem from "../../components/TodoItem.vue";
import FormTodo from "../../components/FormTodo.vue";
import dbCollections from "../../helper/db-collection";

const route = useRoute();
const router = useRouter();
const { deleteColllection, collection, descriptionCollection } =
  useCollection();
const { addTodo, markTodo, editTodo, deleteTodo, doneTodos } = useTodo();
const { formTodo, isEditing, resetForm } = useFormTodo();

const selectedTodo = ref({});

const submitTodo = () => {
  if (isEditing.value) {
    editTodo(formTodo.value);
    resetForm();
    selectedTodo.value = {};
    return;
  }
  addTodo(formTodo.value);
  resetForm();
  selectedTodo.value = {};
  return;
};
const selectTodo = (index) => {
  isEditing.value = true;
  selectedTodo.value = collection.value.todos.at(index);

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
  resetForm();
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
      <p class="font-semibold">
        You have {{ collection.todos?.length }} / {{ doneTodos?.length }} todos
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
          v-for="(todo, index) in collection.todos"
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
