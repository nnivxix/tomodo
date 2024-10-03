<script setup>
import { ref } from "vue";
import Switch from "./Switch.vue";

/** @type {import('@/types').ExampleJsonProp} */
const { json } = defineProps({
  json: Object,
});

const showJson = ref(true);
const example = `
{
  "id": "",
  "name": "",
  "description": "",
  "todos": []
}`;
</script>
<template>
  <div>
    <template v-if="json">
      <div class="flex gap-3 items-center py-3">
        <Switch v-model:modelValue="showJson" id="show_json" />
        <label for="show_json"> Show json format </label>
      </div>
      <highlightjs
        :code="JSON.stringify(json, null, 2)"
        v-if="showJson"
        class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
      >
      </highlightjs>
      <div v-else>
        <TodoItem
          v-for="(todo, index) in json.todos"
          :key="index"
          :todo="todo"
          :preview="true"
        />
      </div>
    </template>
    <template v-else>
      <highlightjs
        :code="example"
        lang="json"
        class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
      >
      </highlightjs>
    </template>
  </div>
</template>
