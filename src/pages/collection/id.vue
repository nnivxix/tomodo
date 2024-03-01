<script setup>
import { useRoute } from "vue-router";
import useCollection from "../../composable/useCollection";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const { getDetailCollection, addTodo } = useCollection();

/**
 * Collection
 * @returns {import('vue').ComputedRef<{
 * id: String,
 * name: String,
 * todos: String[]
 * }>}
 */
const collection = computed(() => getDetailCollection(route.params.id));

const todo = ref("");
/**
 *
 * @param {number} index
 * @description still wip
 */
const deleteTodo = (index) => {
  collection.value.todos.splice(index, 1);
  console.log(index);
};
const addNewTodo = async () => {
  addTodo(collection.value.id, todo.value);
  todo.value = "";
};
</script>
<template>
  <div
    class="grid grid-cols-3 gap-4 relative h-[90vh] md:h-auto"
    v-if="!!collection"
  >
    <div class="col-span-full md:col-span-2">
      <h1 class="text-2xl">{{ collection.name }}</h1>
      <p>You have {{ collection.todos.length }} todo</p>
      <div class="md:mb-0 mb-40">
        <div
          class="border rounded-md py-3 px-2"
          v-for="(todo, index) in collection.todos"
          :key="index"
          @click="deleteTodo(index)"
        >
          {{ index + 1 }} - {{ todo }}
        </div>
      </div>
    </div>
    <form
      class="border md:h-40 border-1 col-span-full fixed md:relative bottom-0 left-0 bg-white md:col-span-1 w-full p-3"
      @submit.prevent="addNewTodo"
    >
      <div>
        <label for="todo">Todo</label>
        <input
          id="todo"
          type="text"
          v-model="todo"
          class="border w-full border-spacing-1"
        />
      </div>
      <button
        type="submit"
        class="p-2 mt-2 bg-[#032836] text-center text-white rounded-lg"
      >
        Add Todo
      </button>
    </form>
  </div>
  <div v-else>please wait</div>
</template>
