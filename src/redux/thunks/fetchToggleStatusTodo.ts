import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo, TodoState } from '../todoSlice'
import type { RootState } from '../store'
import _ from 'lodash'

export default createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodoState } }>(
  'todos/fetchToggleStatusTodo',
  async (id, { rejectWithValue, getState }) => {
    const state = getState() as RootState
    const todo = _.find(state.todos.todos, { id })!

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !todo.completed
      })
    })

    if (!response.ok) {
      return rejectWithValue('No such todo list')
    }

    return await response.json()

  }
)
