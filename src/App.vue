<script setup>
import TitleApp from './components/TitleApp.vue';
import TheInformation from './components/TheInformation.vue';
import ItemTodo from './components/ItemTodo.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { ref, onUpdated, onMounted } from 'vue';
import MyForm from './components/MyForm.vue';
import { todos, deleteTodo, isEditing , editTodo, getTodo, doneTodoToggle } from './composable/todo'


const showModal = ref(false);

const doneTodo = todos.value.filter(todo => todo.done).length

onUpdated(() => { 
  // getTask()
  // console.log(todos.value)
  // console.log(doneTodo)
  // console.log(todos.value.filter(todo => todo.done))
})

onMounted(() => {
  getTodo()
})

</script>

<template>
  <div class="px-5">
    <TitleApp title="Tomodo" />
    <TheInformation :done="doneTodo" :todos="todos.length"/>
    <ItemTodo v-for="(todo, index) in todos" :key="todo.id"
      :priority="todo.priority"
      :todo="todo.todo"
      :time="todo.time"
      :done="todo.done"
      @done-todo="doneTodoToggle(todo.uid)"
      @delete-todo="deleteTodo(todo.uid)"
      @edit-todo="editTodo(index, showModal = true)"
    >
    </ItemTodo>
    <pre>
    {{ isEditing }}
    </pre>
    <vue-final-modal v-model="showModal"
      :overlay-style="{
        'backgroundColor': 'white'
      }" content-class="modal-content">
      <MyForm />
    </vue-final-modal>
    <div class="w-full flex justify-center fixed bottom-6 ">
      <button highlight  @click="showModal = true" class=" p-5 bg-[#032836] text-center text-white rounded-lg">Add Task</button>
    </div>

  </div>

</template>

<style scoped>
  :v-deep .modal-content{
    background-color: aliceblue;
  }
</style>
