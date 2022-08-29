<script setup>
import TitleApp from './components/TitleApp.vue';
import TheInformation from './components/TheInformation.vue';
import ItemTodo from './components/ItemTodo.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { ref, onUpdated, onMounted } from 'vue';
import MyForm from './components/MyForm.vue';
import {
  todos, deleteTodo, getTodo, doneTodoToggle, todoHasDone, editTodo, isEditing, todoItem
  } from './composable/todo'
import { useEventListener } from '@vueuse/core'


const showModal = ref(false);
function addTodoBtn(){
  todoItem.value = ''
  showModal.value = true
}
console.log(todos.value)
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
    <div class="w-full flex justify-center fixed bottom-6 ">
      <button highlight  @click="addTodoBtn" class=" p-5 bg-[#032836] text-center text-white rounded-lg">Add Task</button>
    </div>

  </div>

</template>

<style scoped>
  :v-deep .modal-content{
    background-color: blue;
  }
</style>
