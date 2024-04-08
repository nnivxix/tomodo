import { nanoid } from "nanoid";
import { ref } from "vue";

/**
 * @typedef {import('@/composables/useTodo').Todo} FormTodo
 */
const isEditing = ref(false);
/**
 * @type {import('vue').Ref<FormTodo>}
 */
const formTodo = ref({
  id: `todo-${nanoid(7)}`,
  name: "",
  priority: "high",
  isDone: false,
  created_at: new Date(),
});

const useFormTodo = () => {
  const resetForm = () => {
    formTodo.value = {
      id: `todo-${nanoid(7)}`,
      name: "",
      priority: "high",
      isDone: false,
      created_at: new Date(),
    };
    isEditing.value = false;
  };
  return {
    isEditing,
    formTodo,
    resetForm,
  };
};

export default useFormTodo;
