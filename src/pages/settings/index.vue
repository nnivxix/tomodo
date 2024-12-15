<script setup>
import { ref } from "vue";
import config from "@/configs/database";

const form = ref({
  connection: config.connection,
});

const submit = () => {
  localStorage.setItem("connection", form.value.connection);
};
</script>
<template>
  <div>
    <form @submit.prevent="submit" class="flex gap-2 flex-col">
      <h1>Settings</h1>

      <select class="py-2 px-2 rounded-lg" v-model="form.connection">
        <option value="indexedDB">IndexedDB</option>
        <option value="supabase">Supabase</option>
      </select>
      <button class="bg-dark-one text-white py-3 rounded-lg">
        Save Changes
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
