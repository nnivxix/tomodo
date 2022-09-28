import { openDB } from 'idb'

const dbPromise = openDB('todo-db', 1, {
  upgrade(database) {
    database.createObjectStore('todos', {
      keyPath: 'uid'
    })
  }
}) 

const todosIDB = {

  // adding data
  async addTodo(todo) {
    return (await dbPromise).add('todos', todo)
  },

  // deleting data
  async deleteTodo(uid) {
    return (await dbPromise).delete('todos', uid)
  },

  // read all databases
  async readAllTodo() {
    return (await dbPromise).getAll('todos')
  },

  // edit one todo
  async editTodo(val) {
    return (await dbPromise).put('todos', val)
  }
}

export default todosIDB