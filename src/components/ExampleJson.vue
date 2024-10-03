<script setup>
import { onMounted, onUpdated } from "vue";
import { ref } from "vue";
import Switch from "./Switch.vue";
/** @type {import('@/types').ExampleJsonProp} */
const { json } = defineProps({
  json: Object,
});

onMounted(() => {
  hljs.highlightAll();
});

onUpdated(() => {
  hljs.highlightAll();
});

const showJson = ref(true);
</script>
<template>
  <div>
    <template v-if="json">
      <div class="flex gap-3 items-center py-3">
        <Switch v-model:modelValue="showJson" id="show_json" />
        <label for="show_json"> Show json format </label>
      </div>
      <pre
        v-if="showJson"
        class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
      >
        <code class="language-json">
  {{ json }}
          </code>
          </pre>
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
      <pre
        class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
      >
        <code class="language-json">
  {
    "id": "",
    "name": "",
    "description": "",
    "todos": []
  }
        </code>
          </pre>
    </template>
  </div>
</template>
