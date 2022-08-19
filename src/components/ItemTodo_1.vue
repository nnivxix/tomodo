<template>

  <div v-if="!todos.length">
  kosng bos
  </div>
  <div v-else>

    <article v-for="todo in todos" :key="todo.index"
    class="p-2 m-3 border-2 rounded-lg todo"
    @click="todo.done = !todo.done">
      <!-- <p>{{ todo.done != todo.done }}</p> -->
      <h3 class="text-m-sub-1 todo-text">{{todo.todo}}</h3>
      <p>{{ todo.priority }}</p>
      <p class="text-m- text-m-p">{{ todo.time }}</p>
      <p lass="text-m-p"><a href="#">edit</a> | <a href="#">delete</a></p>
    </article >
  </div>
</template>

<script>
  import { onMounted, ref } from "vue";
  import db  from "../helper/database";

 export default {
  name: 'ItemTodo',
  data() {
    return {
      todos: ''
    }
  },
  methods: {
    getTask() {
      db.collection('todo').get().then(todo => {
      this.todos = todo
      // console.log(todo) 
      })
    }
  },
  created() {
    this.getTask()
  },
  updated() {
    // console.log('updated')
    this.getTask()
  },
 }


</script>

<style scoped>
  .line-through{
    text-decoration: line-through;
  }
</style>