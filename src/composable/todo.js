import { ref } from 'vue';


export const todos = ref([]);

export function addTodo(val){
  todos.value.push(val)
}

