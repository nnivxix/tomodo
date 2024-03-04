<script setup>
import { useRouter } from "vue-router";
import FormCollection from "../../components/FormCollection.vue";
import useFormCollection from "../../composable/useFormCollection";

const router = useRouter();
const { addNewCollection, form } = useFormCollection();

function handleSubmit() {
  addNewCollection();
  router.push("/");
}
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <FormCollection :form="form" @handleSubmit="handleSubmit" />
  </div>
</template>
