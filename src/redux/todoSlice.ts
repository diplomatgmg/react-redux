import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Todo } from '../App'

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
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    toggleTodoComplete (state, action: PayloadAction<{ id: string }>) {
      const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id)
      if (toggledTodo !== undefined) {
        toggledTodo.completed = !toggledTodo.completed
      }
    }
  }
})

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer
export type { TodoState }
