<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const checked = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    checked.value = newValue;
  }
);

const toggle = () => {
  checked.value = !checked.value;
  emit("update:modelValue", checked.value);
};
</script>
<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only"
      :checked="checked"
      @change="toggle"
      :id="props.id"
    />
    <div
      :class="{
        'bg-[#032836]': checked,
        'bg-gray-300': !checked,
      }"
      class="w-12 h-7 py-1 rounded-full transition-colors duration-300 ease-in-out"
    >
      <span
        :class="{
          'translate-x-6': checked,
          'translate-x-1': !checked,
        }"
        class="inline-block w-5 h-5 py-1 transform bg-white rounded-full transition-transform"
      ></span>
    </div>
  </label>
</template>
