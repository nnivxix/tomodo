<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TitleApp from './components/TitleApp.vue';
import TheInformation from './components/TheInformation.vue';
import ItemTodo from './components/ItemTodo.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { reactive, ref, onUpdated, onActivated, onMounted } from 'vue';
import MyForm from './components/MyForm.vue';
import db  from "./helper/database";
// import { useStore } from 'vuex';


const showModal = ref(false);
const todos = ref([]);

function getTask(){
  db.collection('todo').get().then(todo => {
    todos.value = todo
    
    // console.log(todo) 
  })
}

onUpdated(() => { 
  // getTask()
})

onMounted(() => {
  getTask()
  console.log(this)
})

</script>

<template>
  <div class="px-5">
    <TitleApp />
    <TheInformation :todos="todos.length"/>
    <ItemTodo v-for="todo in todos" :key="todo.id"
      :priority="todo.priority"
      :todo="todo.todo"
      :time="todo.time"
    >

    </ItemTodo>
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
