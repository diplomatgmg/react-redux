import React, { type FC, type ReactElement } from 'react'
import { fetchDeleteTodo, fetchToggleStatusTodo } from '../redux/apiRequests'
import { type Todo } from '../redux/todoSlice'
import { useAppDispatch } from '../redux/hooks'

interface TodoItemProps extends Todo {
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed }): ReactElement => {
  const dispatch = useAppDispatch()

  const handleCompleteTodo = (id: string) => (): void => {
    dispatch(fetchToggleStatusTodo(id) as any)
  }
  const handleRemoveTodo = (id: string) => (): void => {
    dispatch(fetchDeleteTodo(id) as any)
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
