<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import FormCollection from "@/components/FormCollection.vue";
import useFormCollection from "@/composables/useFormCollection";
import dbCollection from "@/repositories/db-collection";

const router = useRouter();
const route = useRoute();
const { editCurrentCollection, form, collection } = useFormCollection();

const isEdit = route.fullPath.includes("edit");

function handleSubmit() {
  editCurrentCollection();
  router.push(`/collection/${collection.value.id}`);
}

onMounted(async () => {
  if (isEdit) {
    const dataCollection = await dbCollection.show(route.params.id);
    collection.value = dataCollection;
    if (!!dataCollection) {
      form.value = {
        name: dataCollection.name,
        description: dataCollection.description,
        todos: dataCollection.todos,
      };
      return;
    }
    router.push("/create");
  }
});
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <FormCollection :form="form" @handleSubmit="handleSubmit" :isEdit="true" />
  </div>
</template>
