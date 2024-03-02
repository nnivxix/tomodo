<script setup>
import TitleApp from "./components/TitleApp.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="px-5 mx-auto max-w-4xl">
    <TitleApp title="Tomodo" />
    <router-view></router-view>
  </div>
</template>
