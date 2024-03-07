import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Todo } from '../App'

import _ from 'lodash'

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo (state, action: PayloadAction<{ text: string }>) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      })
    },
    removeTodo (state, action: PayloadAction<{ id: string }>) {
      state.todos = _.reject(state.todos, { id: action.payload.id })
    },
    toggleTodoComplete (state, action: PayloadAction<{ id: string }>) {
      const toggledTodo = _.find(state.todos, { id: action.payload.id })
      if (toggledTodo !== undefined) {
        toggledTodo.completed = !toggledTodo.completed
      }
    }
  }
})

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer
export type { TodoState }
