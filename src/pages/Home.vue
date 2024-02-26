<script setup>
import useCollection from "../composable/useCollection";

const { collections } = useCollection();
</script>
<template>
  <main class="relative min-h-[90vh]">
    <div v-for="collection in collections" :key="collection.id">
      <h1>{{ collection.id }} - {{ collection.name }}</h1>
    </div>
    <router-link
      to="/create"
      class="absolute bottom-1 right-5 bg-[#032836] text-center text-white rounded-lg p-4"
      >Add new collection</router-link
    >
  </main>
</template>
