<script setup>
/** @type {import('@/types').ExampleJsonProp} */
const { json } = defineProps({
  json: Object,
});
</script>
<template>
  <pre
    class="border border-gray-500 border-dashed p-3 rounded-md whitespace-pre-wrap"
    v-if="json"
    >{{ json }}
      </pre
  >
  <pre class="border border-gray-500 border-dashed p-3 rounded-md" v-else>
{
  "id": "",
  "name": "",
  "description": "",
  "todos": []
}
      </pre
  >
</template>
