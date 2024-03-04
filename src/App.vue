<script setup>
import { onMounted } from "vue";
import TitleApp from "@/components/TitleApp.vue";
import useCollection from "@/composables/useCollection";

const { getCollections } = useCollection();

onMounted(async () => await getCollections());
</script>

<template>
  <div class="px-5 mx-auto max-w-4xl">
    <TitleApp title="Tomodo" />
    <router-view></router-view>
  </div>
</template>
