<template>
  <RouterLink to="/" class="text-center text-[36px]">
    <h1>{{ title }}</h1>
  </RouterLink>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
