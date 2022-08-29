import { nanoid } from 'nanoid';
import { ref } from 'vue';
import db from '../helper/database';


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
  db.collection('todos').doc({uid: id}).delete()
  let uid = todos.value.findIndex(todo => todo.uid == id)
  // console.log([todoUid, uid])
  todos.value.splice(uid,1);

}
export function doneTodoToggle(id){
  let todoUid = todos.value.find(todo => todo.uid == id)
  db.collection('todos').doc({uid: id}).update({
    done: !todoUid.done
  })
  todoUid.done = !todoUid.done
}
export function todoHasDone() {
  const result = todos.value.filter(todo => todo.done)
  return result
}


export function editTodo(id, modal) {
  console.log(isEditing.value)
  isEditing.value = true
  let todoUid = todos.value.find(todo => todo.uid == id)
  todoItem.value = todoUid
  console.log(todoItem.value.uid)
  let getid = todos.value.findIndex(todo => todo.uid == todoItem.value.uid)
  console.log(getid)
}

export function updateTodo(val) {
  todos.value.map((obj) => {
    if (obj.uid === todoItem.value.uid) {
      console.log(obj)
      // ??
      todoItem.value = {
          uid: obj.uid,
          todo: val.todo,
          time: val.time,
          priority: val.priority,
          done: obj.done
        }
      return {...obj, ...val}
    }
    console.log(todoItem.value)
  })
  db.collection('todos').doc({ uid: todoItem.value.uid }).update({ 
    todo: todoItem.value.todo,
    time: todoItem.value.time,
    priority: todoItem.value.priority,
  })
  let id = todos.value.findIndex(todo => todo.uid == todoItem.value.uid)
  console.log(id)
  todos.value.splice(id, 0, todoItem.value)
  // db.collection('todos').get().then(todo => {
  //   todos.value = todo
  // })
}

export function getIdTodo(id) {
  let todo = todos.value[id]
}
