<script setup>
import TitleApp from "./components/TitleApp.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="px-5 mx-auto max-w-4xl">
    <TitleApp title="Tomodo" />
    <router-view></router-view>
    <router-link
      v-if="route.path === '/'"
      to="/create"
      class="absolute bottom-5 right-5 lg:right-[30%] bg-[#032836] text-center text-white rounded-lg p-4"
      >Add new collection</router-link
    >
  </div>
</template>
