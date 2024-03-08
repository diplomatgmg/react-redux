import React, { type ReactElement } from 'react'
import { type Todo } from '../App'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import _ from 'lodash'

const TodoList = (): ReactElement | null => {
  const todos = useSelector((state: RootState) => state.todos.todos)

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
