<script setup>
defineProps({
  todo: Object,
  index: Number,
  collectionId: String,
});
</script>
<template>
  <div
    class="border rounded-md py-3 px-2"
    :class="{
      'line-through': todo.isDone,
    }"
  >
    <p @click="$emit('handleMarkTodo', collectionId, index)">
      {{ index + 1 }} - {{ todo }}
    </p>
    <div>
      <button @click="$emit('selectTodo', index)" class="mr-2">edit</button>
      <button @click="$emit('deleteTodo', collectionId, index)">delete</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
