import { ref } from 'vue';


export const todos = ref([]);

export function addTodo(val){
  todos.value.push({
    ...val,
    done:false
  })
}
export function deleteTodo(id) {
  let todo = todos.value.findIndex(todo => todo.id === id);
  todos.value.splice(todo,1);
}
