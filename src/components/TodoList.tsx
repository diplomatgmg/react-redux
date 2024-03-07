import React, { type ReactElement } from 'react'
import { type Todo } from '../App'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'

const TodoList = (): ReactElement | null => {
  const todos: Todo[] = useSelector((state: RootState) => state.todos.todos)

  if (todos.length === 0) {
    return null
  }

  return (
    <ul>
      {
        todos.map((todo) => (
          <TodoItem key={todo.id}
                    {...todo}

          />
        ))
      }
    </ul>
  )
}

export default TodoList
