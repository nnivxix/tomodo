<script setup>
import { Field, useForm, ErrorMessage } from "vee-validate";
import { ref, toRaw, watch } from "vue";
import { useRouter } from "vue-router";
import useCollection from "@/composables/useCollection";
import jsonParser from "@/utils/json-parser";
import validateCollection from "@/utils/validate-collection";

const formImport = useForm();
const router = useRouter();
const { addCollection, getDetailCollection, deleteColllection } =
  useCollection();

const isAttached = ref(false);
const collection = ref(null);
const isCollectionExist = ref(false);

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

async function onSubmit() {
  try {
    const data = await jsonParser(toRaw(formImport.values.file));
    const collection = getDetailCollection(data.id);
    if (!!collection) {
      deleteColllection(data.id);
    }

    addCollection(data);
    router.push("/");
  } catch (error) {
    console.error("Error parsing JSON file:", error);
    formImport.setErrors({
      file: "Error parsing JSON file",
    });
  }
}

function onClear() {
  collection.value = null;
  isCollectionExist.value = false;
  formImport.resetForm();
}

watch(formImport.values, async (form) => {
  if (!!form.file) {
    const data = await jsonParser(toRaw(form.file));
    if (validateCollection(data)) {
      collection.value = data;
      const findCollection = getDetailCollection(data.id);
      if (data.id === findCollection?.id) isCollectionExist.value = true;
      return;
    }
    formImport.setErrors({
      file: "Properties on json file is not valid",
    });
    formImport.setFieldValue("file", null);
    return;
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl">Import Collection</h1>
    <form @submit.prevent="onSubmit" class="grid gap-3">
      <Field name="file" v-slot="{ handleChange }">
        <div
          v-if="!!collection"
          class="hover:bg-[#032836] transform transition-all ease-in col-span-1 hover:text-white p-4 h-36 relative shadow-md rounded-md"
        >
          <h1 class="absolute bottom-3 left-5 text-xl">
            {{ collection.name }} - ({{ collection.todos?.length }})
          </h1>
        </div>
        <label for="file" v-else>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="border border-gray-600 border-dashed w-full py-9 px-5 mt-3 rounded-md"
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
        <button
          type="submit"
          class="p-3 mr-2 mt-2 bg-[#032836] text-center text-white rounded-lg"
        >
          Import Collection
        </button>
        <button
          v-if="!!collection"
          type="button"
          @click="onClear"
          class="p-3 mt-2 bg-red-500 text-center text-white rounded-lg"
        >
          Clear
        </button>
      </div>
    </form>

    <div class="mt-4">
      <div v-if="!!!collection" class="py-3">
        <p>
          If the <strong>id</strong> of file is same with existing collection,
          the collection will be overwrited.
        </p>
        <p>The json file must be structured like this.</p>
      </div>
      <h1 v-if="isCollectionExist" class="py-3">
        The imported collection is already exist.
      </h1>
      <ExampleJson v-bind:json="collection" />
    </div>
  </div>
</template>
