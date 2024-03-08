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
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: boolean | unknown
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: false
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
