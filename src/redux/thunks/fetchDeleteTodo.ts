import { createAsyncThunk } from '@reduxjs/toolkit'

export default createAsyncThunk<string, string, { rejectValue: string }>(
  'todos/deleteTodo',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      return rejectWithValue('Can\'t delete task. Server error.')
    }

    return id
  }
)
