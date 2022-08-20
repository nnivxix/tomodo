<template>
  <h2 class="text-m-sub-1 px-4 text-dark-two">Hello, good morning Hanasa</h2>
  <h3 class="text-m-sub-2 px-4  text-dark-two">here your update</h3>
  <div class="mx-5">
    <div class="w-full bg-gray-300 h-2 rounded-md ">
      <div class=" w-[30%] overflow-hidden bg-dark-two h-2 rounded-md px-2"></div>
    </div>
  <p class="text-right">30%</p>
  </div>
  <p class="p-4 text-[15px]">{{done}}/{{ todos }} task done, let's do great today, don't busy be productive</p>
</template>

<script setup>
  defineProps({
    todos: Number,
    done: Number
  })

</script>