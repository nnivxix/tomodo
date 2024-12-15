<script setup>
import { onMounted, Suspense } from "vue";
import useCollection from "@/composables/useCollection";

// const { getCollections } = useCollection();

// onMounted(async () => await getCollections());
</script>

<template>
  <div class="px-5 mx-auto py-9 max-w-4xl">
    <TitleApp title="Tomodo" />
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </div>
</template>
