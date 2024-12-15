<script setup>
import { useRouter } from "vue-router";
import { customAlphabet } from "nanoid";
import { onMounted } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import useFormCollection from "@/composables/useFormCollection";
import collection from "@/models/collection";

const router = useRouter();
const { addNewCollection, form, resetForm } = useFormCollection();
const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});

/** @param {import('@/types').Collection} values */
const onSubmit = async (values) => {
  const nanoid = customAlphabet("1234567890abcdef", 10);

  const data = {
    id: nanoid(),
    ...values,
  };

  const response = await collection;
  response.create(data);

  // const collection = addNewCollection();
  router.push(`/collection/${data.id}`);
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
