import { nanoid } from 'nanoid';
import { ref } from 'vue';
import db from '../helper/database';


export const todos = ref([]);
export const todoItem = ref('');
export let idTodo = ref('')
export const isEditing = ref(false);

export function addTodo(val){
  todoItem.value = {
    uid: nanoid(5),
    ...val,
    done:false
  }
  console.log(todoItem.value)
  db.collection('todos').add({
    uid: todoItem.value.uid,
    todo: todoItem.value.todo,
    time: todoItem.value.time,
    priority: todoItem.value.priority,
    done: false
  })
  todos.value.push(todoItem.value)
}
export function getTodo(){
  db.collection('todos').get().then(t => {
    todos.value = t
  })
}
export function deleteTodo(id) {
  // let todo = todos.value.findIndex(todo => todo.id === id);
  let todoUid = todos.value.find(todo => todo.uid == id)
  // console.log(todoUid.uid)
  db.collection('todos').doc({uid: id}).delete()
  todos.value.splice(todos.value.indexOf(todoUid.uid),1);

}

export function editTodo(id, modal) {
  console.log(isEditing.value)
  isEditing.value = true
  let todo = todos.value[id]
  todoItem.value = todo
  console.log([todo.uid, todo.todo])
}

export function getIdTodo(id) {
  let todo = todos.value[id]
}
