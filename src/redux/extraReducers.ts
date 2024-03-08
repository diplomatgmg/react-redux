import { type Todo, type TodoState } from './todoSlice'
import { fetchDeleteTodo, fetchTodos, fetchToggleStatusTodo } from './apiRequests'
import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit'

const setError = (state: TodoState, action: PayloadAction<unknown, string, unknown>): void => {
  state.status = 'failed'
  state.error = action.payload
}

export default (builder: ActionReducerMapBuilder<TodoState>): void => {
  builder
    .addCase(fetchTodos.pending, (state: TodoState) => {
      state.status = 'pending'
      state.error = false
    })
  builder.addCase(fetchTodos.fulfilled, (state: TodoState, action: PayloadAction<Todo[]>) => {
    state.status = 'succeeded'
    state.todos = action.payload
  })
  builder.addCase(fetchTodos.rejected, setError)
  builder.addCase(fetchDeleteTodo.rejected, setError)
  builder.addCase(fetchToggleStatusTodo.rejected, setError)
}
