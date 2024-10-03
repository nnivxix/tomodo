import { nanoid } from "nanoid";
import { ref } from "vue";

/**
 *  @typedef {import('@/types').Todo} Todo
 *  @typedef {import('vue').Ref<Todo>} FormTodo
 */

const isEditing = ref(false);

/** @type {FormTodo} */
const formTodo = ref({
  id: `todo-${nanoid(7)}`,
  name: "",
  priority: "high",
  is_done: false,
  created_at: new Date(),
});

const useFormTodo = () => {
  const resetForm = () => {
    formTodo.value = {
      id: `todo-${nanoid(7)}`,
      name: "",
      priority: "high",
      is_done: false,
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
