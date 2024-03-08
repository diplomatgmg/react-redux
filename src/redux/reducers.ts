import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { type TodoState } from './todoSlice'

export default {
  addTodo (state: TodoState, action: PayloadAction<string>) {
    state.todos.push({
      id: new Date().toISOString(),
      title: action.payload,
      completed: false
    })
  },
  removeTodo (state: TodoState, action: PayloadAction<string>) {
    state.todos = _.reject(state.todos, { id: action.payload })
  },
  toggleTodoComplete (state: TodoState, action: PayloadAction<string>) {
    const toggledTodo = _.find(state.todos, { id: action.payload })!
    toggledTodo.completed = !toggledTodo.completed
  }
}
