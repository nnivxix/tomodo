<script setup>
import FormCollection from "../../components/FormCollection.vue";
import useFormCollection from "../../composable/useFormCollection";

const { addNewCollection, form } = useFormCollection();

function handleSubmit() {
  addNewCollection();
}
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <FormCollection :form="form" @handleSubmit="handleSubmit" />
  </div>
</template>
