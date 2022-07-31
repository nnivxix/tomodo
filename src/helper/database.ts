import { openDB } from "idb";
import { nanoid } from "nanoid";
import store from '../store'

const dbPromised = openDB('Todos', 1, {
  upgrade(db) {
    db.createObjectStore('todos', {
      keyPath: 'id'
    }).createIndex('id', 'id');
  }
})

export function addTodo(value: any){
  dbPromised.then((db) => {
    let tx = db.transaction('todos', 'readwrite');
    let store = tx.objectStore('todos')
    store.add({
      id: nanoid(6),
      todo: value.todo,
      time: value.time,
      priority: value.priority,
      done: false
    })
  })
}


// addTodo() simulate add todo
// addTodo()

export function getAllTodo(){
  return new Promise<void>((resolve, reject) => {
    dbPromised
    .then(db => {
      let tx = db.transaction('todos', 'readonly')
      let store = tx.objectStore('todos')
      return store.getAll()
    })
    .then((todo: any) => {
      if(!todo.length){
        reject('Tidak ada Todo, Silakan buat dahulu')
      } else{
        resolve(todo)
      }
    })
  })
}

getAllTodo().then((data : any) => {
  console.log(data)
  data.forEach((d: any) => {
      store.commit('getAllTodo', d)
    });
}).catch(e => {
  console.log(e)
})
