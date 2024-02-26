<script setup>
import { useRoute } from "vue-router";
import useCollection from "../../composable/useCollection";
import { computed } from "vue";

const route = useRoute();
const { getDetailCollection } = useCollection();
const collection = computed(() => getDetailCollection(route.params.id));
</script>
<template>
  <div>
    {{ collection }}
  </div>
</template>
