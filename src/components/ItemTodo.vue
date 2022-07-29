<template>
  <article class="p-2 m-3 border-2 rounded-lg todo" @click="doneTodo">
    <h3 class="text-m-sub-1 todo-text">workout yoga</h3>
    <p class="text-m- text-m-p">7.30 a.m</p>
    <p lass="text-m-p"><a href="#">edit</a> | <a href="#">delete</a></p>
  </article>
</template>

<script lang="ts" setup>
  import { Ref } from "vue";


    function doneTodo() {
      const todoText = document.querySelector('.todo-text');
      todoText?.classList.toggle('line-through')
    }
</script>

<style scoped>
  .line-through{
    text-decoration: line-through;
  }
</style>