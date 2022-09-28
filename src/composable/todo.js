import { nanoid } from 'nanoid';
import { ref } from 'vue';
import todosIDB from '../helper/database'

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
  todosIDB.addTodo({
    uid: todoItem.value.uid,
    todo: todoItem.value.todo.trim(),
    time:todoItem.value.time,
    priority: todoItem.value.priority,
    done: todoItem.value.done
  })
  todos.value.push(todoItem.value)
}
export function getTodo(){
  todosIDB.readAllTodo().then(t => {
    todos.value = t

  })
}
export function deleteTodo(id) {
  let uid = todos.value.findIndex(todo => todo.uid == id)
  let todo = todos.value.find(todo => todo.uid == id)
  
  todosIDB.deleteTodo(todo.uid)
  todos.value.splice(uid,1);
}
export function doneTodoToggle(id){
  let todoUid = todos.value.find(todo => todo.uid == id)
  todosIDB.editTodo({
    ...todoUid,
    done: !todoUid.done
  })
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
  todosIDB.editTodo({
    uid: todoItem.value.uid,
    todo: todoItem.value.todo.trim(),
    time: todoItem.value.time,
    priority: todoItem.value.priority,
    done: todoItem.value.done
  })
  let id = todos.value.findIndex(todo => todo.uid == todoItem.value.uid)
  todos.value.splice(id, 1, todoItem.value)

  todoItem.value = ''
}

