import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { type TodoState } from './todoSlice'

const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    return await response.json()
  }
)

export default (builder: ActionReducerMapBuilder<TodoState>): void => {
  builder
    .addCase(fetchTodos.pending, (state) => {
      state.status = 'loading'
      state.error = false
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.todos = action.payload
    })
    .addCase(fetchTodos.rejected, (state) => {
      state.status = 'rejected'
      state.error = true
    })
}

export { fetchTodos }
