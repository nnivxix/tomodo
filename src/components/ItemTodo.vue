<template>

    <article v-for="todo in todos" :key="todo.index"
    class="p-2 m-3 border-2 rounded-lg todo"
    @click="!todo.done">
      <p>{{ todo.done != todo.done }}</p>
      <h3 class="text-m-sub-1 todo-text">{{todo.todo}}</h3>
      <p>{{ todo.priority }}</p>
      <p class="text-m- text-m-p">{{ todo.time }}</p>
      <p lass="text-m-p"><a href="#">edit</a> | <a href="#">delete</a></p>
    </article >
</template>

<script setup>
import { computed, ref, watch } from "vue";
  import { useStore } from "vuex";
  import { getAllTodo } from "../helper/database";


  const store = useStore(); 

  const todo = computed(() => {
    return store.state.todos[0]
  })
  let todos = ref([])
  function getData(e) {
    return e
  }
  console.log(typeof todos)

  getAllTodo().then((data) => {
    console.log(data)
    return data
      data.forEach(e => {
        todos.push(e)
        getData(e)
      });
    }).catch(e => {
      console.log(e)
    })
</script>

<style scoped>
  .line-through{
    text-decoration: line-through;
  }
</style>