<script setup>
import { computed } from "vue";
import useCollection from "@/composables/useCollection";

const { collections } = useCollection();
const sortedCollections = computed(() =>
  collections.value.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
);
</script>
<template>
  <main class="relative grid grid-cols-2 gap-2">
    <router-link
      v-for="collection in sortedCollections"
      :key="collection.id"
      :to="`collection/${collection.id}`"
      class="hover:bg-[#032836] transform transition-all ease-in col-span-1 hover:text-white p-4 h-36 relative shadow-md rounded-md"
    >
      <h1 class="absolute bottom-3 left-5 text-xl">
        {{ collection.name }} ({{ collection.todos.length }})
      </h1>
    </router-link>
    <router-link
      to="create"
      class="bg-[#b3b3b3] transition-all ease-in hover:bg-[#032836] col-span-1 hover:text-white p-4 h-36 relative shadow-md rounded-md"
    >
      <h1 class="absolute bottom-3 left-5 text-xl">(+) Add New Collection</h1>
    </router-link>
  </main>
</template>
