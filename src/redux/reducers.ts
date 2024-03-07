import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { type TodoState } from './todoSlice'

export default {
  addTodo (state: TodoState, action: PayloadAction<{ title: string }>) {
    state.todos.push({
      id: new Date().toISOString(),
      title: action.payload.title,
      completed: false
    })
  },
  removeTodo (state: TodoState, action: PayloadAction<{ id: string }>) {
    state.todos = _.reject(state.todos, { id: action.payload.id })
  },
  toggleTodoComplete (state: TodoState, action: PayloadAction<{ id: string }>) {
    const toggledTodo = _.find(state.todos, { id: action.payload.id })
    if (toggledTodo !== undefined) {
      toggledTodo.completed = !toggledTodo.completed
    }
  }
}
