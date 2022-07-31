<template>
  <!-- <p>{{ todo.done = true }}</p> -->
  <div v-if="!todos.length">
    <h1>Tidak ada todo sekarang</h1>
  </div>
  <div v-else>
    <article v-for="todo in todos" :key="todo.index"
    class="p-2 m-3 border-2 rounded-lg todo"
    @click="!todo.done">
      <p>{{ todo.done != todo.done }}</p>
      <h3 class="text-m-sub-1 todo-text">{{todo.todo}}</h3>
      <p>{{ todo.priority }}</p>
      <p class="text-m- text-m-p">{{ todo.time }}</p>
      <p lass="text-m-p"><a href="#">edit</a> | <a href="#">delete</a></p>
    </article >
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { useStore } from "vuex";

  const store = useStore(); 

  const todo = computed(() => {
    return store.state.todos[0]
  })
  const todos = computed(() => {
    return store.state.todos
  });
  
</script>

<style scoped>
  .line-through{
    text-decoration: line-through;
  }
</style>