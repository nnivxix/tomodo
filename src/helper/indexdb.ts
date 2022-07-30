import { nanoid } from 'nanoid';


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

  // Put the sticky note into the object store
  let todo = {
    id: id,
    todo: value.todo,
    time: value.time,
    priority: value.priority
  }

  store.add(todo);

  // Wait for the database transaction to complete
  tx.oncomplete = function() { console.log('stored todo!') }
  tx.onerror = function(event: any) {
    alert('error storing note ' + event.target.errorCode);
  }
}

export function addTodoSubmit(value:any) {
  console.log(value) // v => set to localStorage
    addTodo(db, value, nanoid(7))
}
export default  dbReq;