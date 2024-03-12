<script setup>
import ExampleJson from "@/components/ExampleJson.vue";
import { Field, useForm, ErrorMessage } from "vee-validate";
import { ref, toRaw } from "vue";

const formImport = useForm();

const isAttached = ref(false);
const collection = ref({});

function handleDrop(event) {
  event.preventDefault();
  const droppedFiles = event.dataTransfer?.files;

  if (droppedFiles[0].type.includes("json")) {
    const file = droppedFiles[0];

    isAttached.value = true;
    formImport.setValues({
      file,
    });
    formImport.setErrors({});
    return;
  }
  formImport.setErrors({
    file: "File not json",
  });
}

function parserJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      try {
        const data = JSON.parse(reader.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
  });
}

async function onSubmit() {
  try {
    const data = await parserJson(toRaw(formImport.values.file));
    console.log(data);
  } catch (error) {
    console.error("Error parsing JSON file:", error);
    formImport.setErrors({
      file: "Error parsing JSON file",
    });
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl">Import Collection</h1>
    <form @submit.prevent="onSubmit" class="grid gap-3">
      <Field name="file" v-slot="{ handleChange }">
        <div
          v-if="!!formImport.values.file"
          class="hover:bg-[#032836] transform transition-all ease-in col-span-1 hover:text-white p-4 h-36 relative shadow-md rounded-md"
        >
          <h1 class="absolute bottom-3 left-5 text-xl">test (1)</h1>
        </div>
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

    <div class="mt-4">
      <h1>The json file must be structured like this.</h1>
      <ExampleJson />
    </div>
  </div>
</template>