<script setup>
  import TitleApp from './components/TitleApp.vue';
  import TheInformation from './components/TheInformation.vue';
  import ItemTodo from './components/ItemTodo.vue';
  import { VueFinalModal,  } from 'vue-final-modal'
  import { ref,  onMounted } from 'vue';
  import MyForm from './components/MyForm.vue';
  import {
    todos, deleteTodo, getTodo, doneTodoToggle, todoHasDone, editTodo, isEditing, todoItem
    } from './composable/todo'

  const showModal = ref(false);
  function addTodoBtn(){
    todoItem.value = ''
    showModal.value = true
  }
  function close(){
    isEditing.value = false
    todoItem.value = {}
  }
  onMounted(() => {
    getTodo()
  })
</script>

<template>
  <div class="hidden h-screen w-4/5 px-16 md:flex justify-center items-center">
    <p class="text-3xl font-semibold">I'm Sorry, the App doesn't support desktop Mode 🙏.</p>
  </div>
  <div class="px-5 md:hidden ">
    <TitleApp title="Tomodo" />
    <TheInformation :done="todoHasDone().length" :todos="todos.length"/>
    <main class="mb-28">
    <div v-if="!todos.length" class="flex w-full h-[60vh] px-10 items-center">
      <h1>Oppss No todo right now. let's create <span role="button" @click="addTodoBtn" class="underline">todo</span>.</h1>
    </div>
    <div v-else>
      <ItemTodo v-for="(todo, index) in todos" :key="todo.id"
        :priority="todo.priority"
        :todo="todo.todo"
        :time="todo.time"
        :done="todo.done"
        @done-todo="doneTodoToggle(todo.uid)"
        @delete-todo="deleteTodo(todo.uid)"
        @edit-todo="editTodo(todo.uid,showModal = true)"
      >
      </ItemTodo>
    </div>
    </main>
    <vue-final-modal  v-model="showModal"
      :overlay-style="{
        'backgroundColor': 'white'
      }"
      content-class="modal-content"
      @click-outside="close"
      >
      <MyForm />
    </vue-final-modal>
    <div class="w-full flex justify-center fixed bottom-6 left-0">
      <button highlight  @click="addTodoBtn" class=" p-5 bg-[#032836] text-center text-white rounded-lg">Add Now</button>
    </div>

  </div>

</template>

<style scoped>
  :v-deep .modal-content{
    background-color: blue;
  }
</style>
