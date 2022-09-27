import { nanoid } from 'nanoid';
import { ref } from 'vue';

export const todos = ref([]);
export const todoItem = ref({});
export let idTodo = ref('')
export const isEditing = ref(false);

export function addTodo(val){
  todoItem.value = {
    uid: nanoid(5),
    ...val,
    done:false
  }
  todoItem.value.todo.trim();
  console.log(todoItem.value.uid)
  console.log(todoItem.value.todo)
  todos.value.push(todoItem.value)
}
export function getTodo(){

}
export function deleteTodo(id) {
  
  let uid = todos.value.findIndex(todo => todo.uid == id)
  todos.value.splice(uid,1);

}
export function doneTodoToggle(id){
  let todoUid = todos.value.find(todo => todo.uid == id)
  todoUid.done = !todoUid.done
}
export function todoHasDone() {
  const result = todos.value.filter(todo => todo.done)
  return result
}


export function editTodo(id, modal) {
  isEditing.value = true
  let todoUid = todos.value.find(todo => todo.uid == id)
  todoItem.value = todoUid
  let getid = todos.value.findIndex(todo => todo.uid == todoItem.value.uid)
}

export function updateTodo(val) {
  todos.value.map((obj) => {
    if (obj.uid === todoItem.value.uid) {
      todoItem.value = {
          uid: obj.uid,
          todo: val.todo,
          time: val.time,
          priority: val.priority,
          done: obj.done
        }
      return {...obj, ...val}
    }
  })

  let id = todos.value.findIndex(todo => todo.uid == todoItem.value.uid)
  todos.value.splice(id, 1, todoItem.value)
}

