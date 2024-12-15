<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, toRaw } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import useFormCollection from "@/composables/useFormCollection";
import model from "@/repositories/adapter";

const router = useRouter();
const route = useRoute();
const { form, collection } = useFormCollection();

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
const isEdit = route.fullPath.includes("edit");
const store = await model();

/** @param {import('@/types').Collection} values */
const onSubmit = async (values) => {
  form.value = {
    ...values,
    todos: toRaw(collection.value.todos),
  };

  await store.update(route.params.id, {
    name: values.name,
    description: values.description,
  });

  router.push(`/collection/${route.params.id}`);
};

onMounted(async () => {
  collection.value = await store.find(route.params.id);
  if (isEdit) {
    if (!!collection.value) {
      form.value = {
        name: collection.value.name,
        description: collection.value.description,
        todos: collection.value.todos,
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
