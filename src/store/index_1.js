import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      todos: [],
    }
  },
  mutations: {
    addTodo(state, n){
      state.todos.push(n)
    },
    getAllTodo(state, n){
      state.todos.push(n)
    },
    doneTodo(state, n) {
      
    }
  },
  actions: {
    actGetAllTodos({commit}) {
      commit('getAllTodo')
    }
  }
})

export default store;