<template>
  <article class="p-2 m-3 border-2 rounded-lg todo">
    <h3 class="text-m-sub-1 todo-text">{{todo}}</h3>
      <p>{{ priority }}</p>
      <p class="text-m- text-m-p">{{ time }}</p>
      <p lass="text-m-p"><a href="#">edit</a> | <a href="#">delete</a></p>
  </article>
</template>

<script setup>
  defineProps({
    todo: String,
    priority: String,
    time: String
  })
</script>