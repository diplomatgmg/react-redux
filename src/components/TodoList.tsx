import React, { type ReactElement } from 'react'
import TodoItem from './TodoItem'
import _ from 'lodash'
import { type Todo } from '../redux/todoSlice'
import { useAppSelector } from '../redux/hooks'

const TodoList = (): ReactElement | null => {
  const todos = useAppSelector((state) => state.todos.todos)

  if (todos.length === 0) {
    return null
  }

  const sortedTodos = _.sortBy(todos, ['completed'] as Array<keyof Todo>)

  return (
    <ul>
      {sortedTodos.map((todo) => (
          <TodoItem key={todo.id}
                    {...todo}
          />
      ))}
    </ul>
  )
}

export default TodoList
