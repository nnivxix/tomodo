import { openDB } from "idb";
import store from '../store'

async function todo() {
  const db = await openDB('Todos', 1, {
    upgrade(db) {
      const store = db.createObjectStore('todos', {
        keyPath: 'id'
      });

      store.createIndex('id', 'id');
    },
  }); 

  // Add an article:
  // await db.add('articles', {
  //   title: 'Article 1',
  //   date: new Date('2019-01-01'),
  //   body: '…',
  // });

  
  //get all todo
  console.log(await db.getAllFromIndex('todos', 'id'));

  // inser db into vuex 
  const datas = await db.getAllFromIndex('todos', 'id');
  datas.forEach(data => {
    store.commit('getAllTodo', data)
  });
  
}

todo()