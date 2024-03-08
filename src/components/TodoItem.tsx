import React, { type FC, type ReactElement } from 'react'
import { type Todo } from '../App'
import { useDispatch } from 'react-redux'
import { toggleTodoComplete } from '../redux/todoSlice'
import { fetchDeleteTodo } from '../redux/extraReducers'

interface TodoItemProps extends Todo {
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed }): ReactElement => {
  const dispatch = useDispatch()

  const handleCompleteTodo = (id: string) => (): void => {
    dispatch(toggleTodoComplete({ id }))
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
