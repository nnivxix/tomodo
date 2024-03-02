<script setup>
import { useRoute } from "vue-router";
import { nanoid } from "nanoid";
import { computed, onMounted, ref, reactive } from "vue";
import useCollection from "../../composable/useCollection";

const route = useRoute();
const { getDetailCollection, addTodo } = useCollection();

const collection = computed(() => getDetailCollection(route.params.id));

const todo = ref({
  id: `todo-${nanoid(7)}`,
  name: "",
  priority: "Important",
  isDone: false,
  created_at: new Date(),
});

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
  todo.value = {
    name: "",
    priority: "Important",
    isDone: false,
  };
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
      <p>You have {{ collection.todos.length }} todo</p>
      <div class="md:mb-0 overflow-y-scroll md:h-[80vh] h-[55vh] scroll-bar">
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
      class="border md:h-auto border-1 flex flex-col gap-3 col-span-full bottom-0 left-0 bg-white md:col-span-1 w-full p-3"
      @submit.prevent="addNewTodo"
    >
      <div>
        <label for="todo">Todo</label>
        <input
          id="todo"
          type="text"
          v-model="todo.name"
          class="border w-full border-spacing-1 rounded-md p-1"
        />
      </div>
      <div class="rounded-md">
        <label for="priority">Priority</label>
        <select
          v-model="todo.priority"
          class="w-full p-3 rounded-lg"
          id="priority"
        >
          <option disabled value="">Please select one priority</option>
          <option>Important</option>
          <option>Urgent</option>
          <option>Later</option>
        </select>
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
