import { nanoid } from "nanoid";
import { ref } from "vue";

const isEditing = ref(false);
const formTodo = ref({
  id: `todo-${nanoid(7)}`,
  name: "",
  priority: "Important",
  isDone: false,
  created_at: new Date(),
});

const useFormTodo = () => {
  const resetForm = () => {
    formTodo.value = {
      id: `todo-${nanoid(7)}`,
      name: "",
      priority: "Important",
      isDone: false,
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
