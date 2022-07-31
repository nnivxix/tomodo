import { nanoid } from 'nanoid';
import { mapMutations } from 'vuex'

let db: { createObjectStore: (arg0: string, arg1: { autoIncrement: boolean; }) => any; };
let dbReq = indexedDB.open('mytodos', 1);

dbReq.onupgradeneeded = function(event: any) {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  let todos = db.createObjectStore('todos', {autoIncrement: true});
}
dbReq.onsuccess = function(event: any) {
  db = event.target.result;
}

dbReq.onerror = function(event: any) {
  alert('error opening database ' + event.target.errorCode);
}

// add todo
export function addTodo( db: any , value: any, id: string) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['todos'], 'readwrite');
  let store = tx.objectStore('todos');

  let todo = {
    id: id,
    todo: value.todo,
    time: value.time,
    priority: value.priority
  }

  store.add(todo);

  tx.oncomplete = function() { getAnddisplayTodos(db); }
  tx.onerror = function(event: any) {
    alert('error storing note ' + event.target.errorCode);
  }
}

let retAllTodos :any[] = []

function getAnddisplayTodos(db: any) {
  let request = db.transaction(['todos'], 'readonly')
      .objectStore('todos')
      .getAll();
  // let temp = []
  // console.log(temp)
  request.onsuccess = ()=> {
  const todos = request.result;

  console.log('Got all the students');
  console.table(todos)

  return todos;
  console.log(getTodo(todos));


}

request.onerror = (err)=> {
console.error(`Error to get all students: ${err}`)
}
}

// console.log(getAnddisplayTodos(db))
dbReq.onsuccess = function(event: any) {
  db = event.target.result;
  // Once the database is ready, display the notes we already have!
  getAnddisplayTodos(db);
}


export function addTodoSubmit(value:any) {
  console.log(value) // v => set to localStorage
    addTodo(db, value, nanoid(7))
}

console.log(getTodo(db))
function getTodo(todos: any){
  return todos;
}

console.log(dbReq)
export default  {dbReq, retAllTodos};