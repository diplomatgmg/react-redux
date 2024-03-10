import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo } from '../todoSlice'

export default createAsyncThunk<Todo, string, { rejectValue: string }>(
  'todos/addNewTodo',
  async function (text, { rejectWithValue }) {
    const todo = {
      title: text,
      userId: 1,
      completed: false
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    if (!response.ok) {
      return rejectWithValue('Can\'t add task. Server error.')
    }

    return await response.json()
  }
)
