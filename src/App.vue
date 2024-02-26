<script setup>
import TitleApp from "./components/TitleApp.vue";
import TheInformation from "./components/TheInformation.vue";
import ItemTodo from "./components/ItemTodo.vue";
import { VueFinalModal } from "vue-final-modal";
import { ref, onMounted, onUpdated, computed } from "vue";

import AddCollectionForm from "./components/AddCollectionForm.vue";
import useCollection from "./composable/useCollection";
const showModal = ref(false);
const { collections } = useCollection();
function close() {
  console.log(close);
}
</script>

<template>
  <div class="px-5 mx-auto max-w-4xl">
    <TitleApp title="Tomodo" />

    <main class="mb-28">
      <pre>{{ collections }}</pre>
    </main>
    <vue-final-modal
      v-model="showModal"
      :overlay-style="{
        backgroundColor: 'white',
      }"
      content-class="modal-content"
      @click-outside="close"
    >
      <AddCollectionForm />
    </vue-final-modal>
    <div class="w-full flex justify-center fixed bottom-6 left-0">
      <button
        highlight
        @click="addTodoBtn"
        class="p-5 bg-[#032836] text-center text-white rounded-lg"
      >
        Add Todo Collection
      </button>
    </div>
  </div>
</template>

<style scoped>
:v-deep .modal-content {
  background-color: blue;
}
</style>
