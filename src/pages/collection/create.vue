<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import FormCollection from "@/components/FormCollection.vue";
import useFormCollection from "@/composables/useFormCollection";

const router = useRouter();
const { addNewCollection, form, resetForm } = useFormCollection();
const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});

const onSubmit = (values) => {
  form.value = values;
  form.value.todos = [];
  addNewCollection();
  router.push("/");
};

onMounted(() => {
  resetForm();
});
</script>
<template>
  <div class="mx-auto max-w-2xl">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="flex flex-col gap-4"
    >
      <FormCollection :form="form" />
    </Form>
  </div>
</template>
