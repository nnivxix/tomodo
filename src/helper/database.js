  let db = null;
  const DBOpenRequest = window.indexedDB.open('toDoList', 4);
  let getAlltodos = null
  
  export function initDB() {
    // Register two event handlers to act on the database being opened successfully, or not
    DBOpenRequest.onerror = (event) => {
    };
  
    DBOpenRequest.onsuccess = (event) => {
  
      // Store the result of opening the database in the db variable. This is used a lot below
      db = DBOpenRequest.result;
      const tx = db.transaction('toDoList', 'readonly')
      const todos = tx.objectStore('toDoList')
      console.log(typeof todos.getAll())
      getAlltodos = todos.getAll()



    };
  
    // This event handles the event whereby a new version of the database needs to be created
    // Either one has not been created before, or a new version number has been submitted via the
    // window.indexedDB.open line above
    //it is only implemented in recent browsers
    DBOpenRequest.onupgradeneeded = (event) => {
      db = event.target.result;
  
  
      // Create an objectStore for this database
      const objectStore = db.createObjectStore('toDoList', { keyPath: 'uid' });
      
    };
    
  }

  export function addTodoIDB(val){
    const todo = {
      uid: val.uid,
      todo: val.todo,
      priority: val.priority,
      time: val.time,
      done: val.done
    }
    console.log(db)
    const tx = db.transaction('toDoList', 'readwrite')
    const todos = tx.objectStore('toDoList')
    todos.add(todo)
  }

  export function getAllIDB(){
    initDB()
    console.log(db)
    const tx = db.transaction('toDoList', 'readonly')
    const todos = tx.objectStore('toDoList')
    todos.openCursor()
      request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
            console.log(cursor)
            //do something with the cursor
            cursor.continue()
        }
      }
  }

  console.log(getAlltodos)