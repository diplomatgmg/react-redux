import React, { type FC, type ReactElement } from 'react'
import { type Todo } from '../App'
import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodoComplete } from '../redux/todoSlice'

interface TodoItemProps extends Todo {

}

const TodoItem: FC<TodoItemProps> = ({ id, text, completed }): ReactElement => {
  const dispatch = useDispatch()

  const handleCompleteTodo = (id: string) => () => dispatch(toggleTodoComplete({ id }))
  const handleRemoveTodo = (id: string) => () => dispatch(removeTodo({ id }))

  return (
    <li key={id}>
      <input type="checkbox"
             checked={completed}
             onChange={handleCompleteTodo(id)}/>
      <span>{text}</span>
      <span className="delete"
            onClick={handleRemoveTodo(id)}>
        &times;
      </span>
    </li>
  )
}

export default TodoItem
