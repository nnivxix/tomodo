<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TitleApp from './components/TitleApp.vue';
import TheInformation from './components/TheInformation.vue';
import ItemTodo from './components/ItemTodo.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import { reactive, ref } from 'vue';
import MyForm from './components/MyForm.vue';


const showModal = ref(false);

</script>

<template>
  <div class="px-5">
    <TitleApp />
    <TheInformation />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
    <ItemTodo />
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
