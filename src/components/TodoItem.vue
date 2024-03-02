<script setup>
defineProps({
  todo: Object,
  index: Number,
  collectionId: String,
  isSelected: Boolean,
});
</script>
<template>
  <div
    class="border rounded-md py-3 my-2 px-2"
    :class="{
      'line-through': todo.isDone,
      'bg-gray-100': isSelected,
    }"
  >
    <div
      @click="$emit('handleMarkTodo', collectionId, index)"
      class="border-r-2"
      :class="{
        'border-red-300': todo.priority === 'high',
        'border-orange-300': todo.priority === 'medium',
        'border-green-300': todo.priority === 'low',
      }"
    >
      <p class="text-xl">
        {{ todo.name }}
      </p>
    </div>
    <div>
      <button @click="$emit('selectTodo', index)" class="mr-2">edit</button>
      <button @click="$emit('deleteTodo', collectionId, index)">delete</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
