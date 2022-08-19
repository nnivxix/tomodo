import { defineStore } from 'pinia'

export const useStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(n) {
      this.todos.push(n)
    }
  }
})