import { type TodoState } from './todoSlice'
import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import fetchTodos from './thunks/fetchTodos'
import fetchToggleStatusTodo from './thunks/fetchToggleStatusTodo'
import fetchDeleteTodo from './thunks/fetchDeleteTodo'
import fetchAddNewTodo from './thunks/fetchAddNewTodo'

const isError = (action: PayloadAction<any>): boolean => {
  return action.type.endsWith('rejected')
}

export default (builder: ActionReducerMapBuilder<TodoState>): void => {
  builder
    .addCase(fetchTodos.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchAddNewTodo.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchToggleStatusTodo.pending, (state, action) => {
      const toggledTodo = _.find(state.todos, action.payload)!
      toggledTodo.completed = !toggledTodo.completed
    })

    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload
      state.loading = false
    })
    .addCase(fetchAddNewTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload)
    })
    .addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      state.todos = _.reject(state.todos, { id: action.payload })
    })

    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    })
}
