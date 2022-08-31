<template>
  <h2 class="text-m-sub-1 px-4 text-dark-two" @dblclick="alert('db clik')">Hello, {{ sunPattern }} Human.</h2>
  <h3 class="text-m-sub-2 px-4 pb-2 text-dark-two">Here your progress.</h3>
  <div class="mx-5">
    <div class="w-full bg-gray-300 h-2 rounded-md ">
      <div :style="{'width': `${Math.round((done / todos)* 100)}%` }"
      class="overflow-hidden bg-dark-two h-2 rounded-md px-2"></div>
    </div>
  <p class="text-right" v-if="!todos">0%</p>
  <p class="text-right" v-else>{{ Math.round((done / todos)* 100)}}%</p>
  </div>

  <!-- quote information -->
  <p class="p-4 text-[15px]">{{done}}/{{ todos }} task done, let's do great today, don't busy be productive</p>
</template>

<script setup>
  import { computed } from 'vue';
  
  defineProps({
    todos: Number,
    done: Number
  })

  const sunPattern = computed(() => {
    const hour = new Date().getHours();
    if (hour <= 10) {
      return 'Good Morning'
    } else if(hour >= 16) {
      return 'Good Evening'
    } else if(hour >= 18) {
      return 'Good Night'
    } else {
      return 'Good Afternoon'
    }
  })

</script>