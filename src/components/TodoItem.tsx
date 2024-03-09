import React, { type FC, type ReactElement } from 'react'
import { type Todo } from '../redux/todoSlice'
import { useAppDispatch } from '../redux/hooks'
import fetchToggleStatusTodo from '../redux/thunks/fetchToggleStatusTodo'
import fetchDeleteTodo from '../redux/thunks/fetchDeleteTodo'

interface TodoItemProps extends Todo {
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed }): ReactElement => {
  const dispatch = useAppDispatch()

  const handleCompleteTodo = (id: string) => (): void => {
    void dispatch(fetchToggleStatusTodo(id))
  }
  const handleRemoveTodo = (id: string) => (): void => {
    void dispatch(fetchDeleteTodo(id))
  }

  return (
    <li key={id}>
      <input type="checkbox"
             checked={completed}
             onChange={handleCompleteTodo(id)}/>
      <span>{title}</span>
      <span className="delete"
            onClick={handleRemoveTodo(id)}>
        &times;
      </span>
    </li>
  )
}

export default TodoItem
