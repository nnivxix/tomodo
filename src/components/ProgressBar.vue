<script setup>
import { computed } from "vue";

/** @type { import('@/types').ProgressBarProp }  */
const { totalDoneTodos, totalTodos } = defineProps({
  totalDoneTodos: Number,
  totalTodos: Number,
});

/**  @returns {import('vue').ComputedRef<number>} */
const percentage = computed(() => {
  const countTodos = Math.round((totalDoneTodos / totalTodos) * 100);
  return isNaN(countTodos) ? 0 : countTodos;
});
</script>

<template>
  <div>
    <div class="w-full bg-gray-300 h-2 rounded-md">
      <div
        :style="{
          width: `${percentage}%`,
        }"
        :class="[!!percentage ? 'block' : 'hidden']"
        class="overflow-hidden bg-dark-two h-2 rounded-md px-2"
      ></div>
    </div>
    <p class="text-right">{{ percentage }}%</p>
  </div>
</template>
