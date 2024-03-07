import React, { type ReactElement } from 'react'
import { type Todo } from '../App'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'

const TodoList = (): ReactElement | null => {
  const todos = useSelector((state: any) => state.todos.todos)

  if (todos.length === 0) {
    return null
  }

  return (
    <ul>
      {
        todos.map((todo: Todo) => (
          <TodoItem key={todo.id}
                    {...todo}

          />
        ))
      }
    </ul>
  )
}

export default TodoList
