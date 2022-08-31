import { assert, describe, expect, it } from 'vitest'
import { todos, updateTodo, editTodo, deleteTodo, addTodo } from '../src/composable/todo';

describe('testing functionality of todo', () => {
  it('you don\'t have todo', () => {
    assert.equal(todos.value.length, 0)
  })

  it('add todo', () => {
    const todo = {
      todo: 'Test',
      time: '13:00',
      priority: 'basic',
    }
    addTodo(todo)
    assert.equal(todos.value.length, 1);
  })

  it('todo has done', () => {
    todos.value[0].done = true
    expect(todos.value[0].done).toBeTruthy()
  })

  it('update todo', () => {
    const valueTodo = {
      todo: 'todo updated',
      time: '14:00',
      priority: 'important'
    }
    editTodo(todos.value[0].uid,true)
    updateTodo(valueTodo)

    assert.equal(todos.value[0].todo,'todo updated')
  })

  it('delete todo', () => {
    deleteTodo(todos.value[1].uid)
    assert.equal(todos.value.length, 1)
  })
  
})