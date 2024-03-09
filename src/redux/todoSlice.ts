import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'
import extraReducers from './extraReducers'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers,
  extraReducers
})

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer
export { type Todo, type TodoState }
