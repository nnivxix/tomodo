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
</script>

<template>
  <div class="px-5 mx-auto max-w-4xl">
    <TitleApp title="Tomodo" />

    <main class="mb-28">
      <div v-for="collection in collections" :key="collection.id">
        <h1>{{ collection.id }} - {{ collection.name }}</h1>
      </div>
    </main>
  </div>
</template>
