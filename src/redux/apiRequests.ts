import { createAsyncThunk } from '@reduxjs/toolkit'
import { addTodo, removeTodo, toggleTodoComplete } from './todoSlice'
import _ from 'lodash'
import { type RootState } from './store'

const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

      if (!response.ok) {
        console.log('bad request')
        return
      }

      return await response.json()

    } catch (error: any) {
      return rejectWithValue(error.message)
    }

  }
)

const fetchDeleteTodo = createAsyncThunk(
  'todos/fetchDeleteTodo',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        console.log('Can\'t delete task.')
        return
      }

      dispatch(removeTodo({ id }))

    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const fetchToggleStatusTodo = createAsyncThunk(
  'todos/fetchToggleStatusTodo',
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState
    const todo = _.find(state.todos.todos, { id })!

    try {
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
        console.log('Can\'t patch task.')
        return
      }

      dispatch(toggleTodoComplete({ id }))

    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const fetchAddNewTask = createAsyncThunk(
  'todos/fetchAddNewTask',
  async (title: string, { rejectWithValue, dispatch }) => {
    const todo = {
      title,
      userId: 1,
      completed: false
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })

      if (!response.ok) {
        console.log('Can\'t create new task.')
        return
      }

      dispatch(addTodo({ title }))

    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export { fetchTodos, fetchDeleteTodo, fetchToggleStatusTodo, fetchAddNewTask }
