import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo } from '../todoSlice'

export default createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

    if (!response.ok) {
      return rejectWithValue('Server Error')
    }

    return await response.json()
  }
)
