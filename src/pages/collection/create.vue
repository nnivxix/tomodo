<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
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

  const collection = addNewCollection();
  router.push(`/collection/${collection.id}`);
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
    <div>
      <p>
        Already have a Tomodo json file?
        <RouterLink to="/import" class="underline text-blue-700"
          >now you can import it</RouterLink
        >
      </p>
    </div>
  </div>
</template>
