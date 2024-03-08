import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { removeTodo, type TodoState } from './todoSlice'

const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

      if (!response.ok) {
        throw new Error('bad request')
      }

      return await response.json()

    } catch (error: any) {
      return rejectWithValue(error.message)
    }

  }
)

const fetchDeleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Can\'t delete task.')
      }

      dispatch(removeTodo({ id }))

    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state: any, action: any): void => {
  state.status = 'rejected'
  state.error = action.payload
}

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
    .addCase(fetchTodos.rejected, setError)
    .addCase(fetchDeleteTodo.rejected, setError)

}

export { fetchTodos, fetchDeleteTodo }
