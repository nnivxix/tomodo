<script setup>
defineProps({
  totalDoneTodos: Number,
  totalTodos: Number,
});
</script>

<template>
  <div class="mx-5">
    <div class="w-full bg-gray-300 h-2 rounded-md">
      <div
        :style="{
          width: `${Math.round((totalDoneTodos / totalTodos) * 100)}%`,
        }"
        class="overflow-hidden bg-dark-two h-2 rounded-md px-2"
      ></div>
    </div>
    <p class="text-right" v-if="!totalTodos">0%</p>
    <p class="text-right" v-else>
      {{ Math.round((totalDoneTodos / totalTodos) * 100) }}%
    </p>
  </div>
</template>
