<script setup>
import { onMounted, Suspense } from "vue";
import useCollection from "@/composables/useCollection";

const { getCollections } = useCollection();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log({ supabaseUrl, supabaseKey });

onMounted(async () => await getCollections());
</script>

<template>
  <div class="px-5 mx-auto py-9 max-w-4xl">
    <TitleApp title="Tomodo" />
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </div>
</template>
