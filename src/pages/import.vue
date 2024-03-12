<script setup>
import { Field, useForm, ErrorMessage } from "vee-validate";
import { ref } from "vue";

const formImport = useForm();

const isAttached = ref(false);

function handleDrop(event) {
  event.preventDefault();
  const droppedFiles = event.dataTransfer?.files;

  if (droppedFiles[0].type.includes("json")) {
    isAttached.value = true;
    formImport.setValues({
      file: droppedFiles[0],
    });
    formImport.setErrors({});
    return;
  }
  formImport.setErrors({
    file: "File not json",
  });
}
function onSubmit() {
  console.log("submit");
  console.log(formImport.values);
}
</script>

<template>
  <div>
    <h1>Import Collection</h1>
    <form @submit.prevent="onSubmit" class="grid gap-3">
      <Field name="file" v-slot="{ handleChange }">
        <div v-if="isAttached">file Dropped</div>
        <label for="file" v-else>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="border border-gray-600 border-dashed w-full py-9 px-5 mt-3"
          >
            <input
              id="file"
              accept="application/json"
              type="file"
              class="sr-only"
              @change="handleChange"
            />
            <span class="text-center block"> Upload json file </span>
          </div>
        </label>
        <ErrorMessage name="file" class="text-red-500" />
      </Field>
      <div>
        <button class="p-3 mt-2 bg-[#032836] text-center text-white rounded-lg">
          Import Collection
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
