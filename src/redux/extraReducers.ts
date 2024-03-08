import { type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { type TodoState } from './todoSlice'
import { fetchDeleteTodo, fetchTodos, fetchToggleStatusTodo } from './apiRequests'

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
    .addCase(fetchToggleStatusTodo.rejected, setError)

}
