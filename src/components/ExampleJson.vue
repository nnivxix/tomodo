<script setup>
import { onMounted, onUpdated } from "vue";
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
</script>
<template>
  <template v-if="json">
    <pre
      class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
    >
      <code class="language-json">
{{ json }}
        </code>
        </pre>
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
</template>
