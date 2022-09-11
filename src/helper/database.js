import { nanoid } from 'nanoid';
import { todos } from '../composable/todo';

let openRequest = indexedDB.open('Todos', '1');
let myidb;
// create/upgrade the database without version checks
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('todos')) { // if there's no "todos" store
    db.createObjectStore('todos', {keyPath: 'uid'}); // create it
  }
};

export function addTodoIDB() {
  let db = openRequest.result;
  let transaction = db.transaction("todos", "readwrite"); // (1)

  // get an object store to operate on it
  let todos = transaction.objectStore("todos"); // (2)

  let todo = {
    uid: nanoid(6) ,
    todo: 'minum',
    time: '15:00',
    priority: 'basic',
    done: false,
    created: new Date(),
  };

  let request = todos.add(todo); // (3)

  request.onsuccess = function() { // (4)
    console.log("Todo added to the store", request.result);
  };

  request.onerror = function() {
    console.log("Error", request.error);
  };
}

export function getAllTodoIDB() {
  let db = openRequest.result;
  let transaction = db.transaction("todos", "readonly"); // (1)

  // get an object store to operate on it
  let todoStore = transaction.objectStore("todos");

  let getTodo = todoStore.getAll()
  // console.log(db)
  getTodo.onsuccess = function(ev) { 
    // console.log(request.result);
    let request = ev.target;

    request.result.map(todo => {
      return todos.value.push(todo);
    })
  };

  getTodo.onerror = function() {
    console.error("Error", request.error);
  };
}