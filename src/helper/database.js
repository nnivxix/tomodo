import { openDB } from 'idb/with-async-ittr';

const db = await openDB('Todos', 1, {
  upgrade(database) {
    const store = database.createObjectStore('todos', { 
      keyPath: 'uid',
      autoIncrement: true 
    });
    store.createIndex('uid','uid')
  }
});
export async function addIDB(todo) {
  console.log(todo)
  await db.add('todos',{
    ...todo
  })
  console.log(await db.getAllFromIndex('todos', 'uid'))
}

export async function getAllTodoIDB() {
  await db.getAll('todos')
}