<script setup>
/**
 * @type {{
 * todo: import('@/composables/useTodo').Todo,
 * isSelected: boolean
 *  }}
 */
const { todo, isSelected } = defineProps({
  todo: Object,
  isSelected: Boolean,
});
</script>
<template>
  <div
    class="border rounded-md py-3 my-2 px-2 cursor-pointer"
    :class="{
      'line-through': todo.isDone,
      'bg-gray-100': isSelected,
    }"
  >
    <div
      @click="$emit('handleMarkTodo')"
      class="border-r-2"
      :class="{
        'border-red-400': todo.priority === 'high',
        'border-orange-300': todo.priority === 'medium',
        'border-green-300': todo.priority === 'low',
      }"
    >
      <p class="text-xl">{{ todo.name }}</p>
    </div>
    <div>
      <button @click="$emit('selectTodo')" class="mr-2">edit</button>
      <button @click="$emit('deleteTodo')">delete</button>
    </div>
  </div>
</template>
