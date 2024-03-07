import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type Todo } from '../App'
import reducers from './reducers'
import extraReducers from './extraReducers'

interface TodoState {
  todos: Todo[]
  status: 'loading' | 'resolved' | 'rejected' | null
  error: boolean
}

const initialState: TodoState = {
  todos: [],
  status: null,
  error: false
}

const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    return await response.json()
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers,
  extraReducers
})

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer
export { type TodoState, fetchTodos }
