import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      todos: [],
    }
  },
  mutations: {
    getAllTodo(state, n){
      state.todos.push(n)
    }
  },
  actions: {
    actGetAllTodos({commit}) {
      commit('getAllTodo')
    }
  }
})

export default store;