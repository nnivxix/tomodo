<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, toRaw } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import useFormCollection from "@/composables/useFormCollection";
import dbCollection from "@/repositories/db-collection";

const router = useRouter();
const route = useRoute();
const { editCurrentCollection, form, collection } = useFormCollection();
const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
const isEdit = route.fullPath.includes("edit");

const onSubmit = (values) => {
  form.value = {
    ...values,
    todos: toRaw(collection.value.todos),
  };
  const updatedCollection = editCurrentCollection();

  router.push(`/collection/${updatedCollection.id}`);
};

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
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="flex flex-col gap-4"
      :initial-values="form"
    >
      <FormCollection :form="form" :isEdit="true" />
    </Form>
  </div>
</template>
