import React, { type ChangeEvent, useState } from 'react'
import './style.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { useDispatch } from 'react-redux'
import { addTodo } from './redux/todoSlice'

interface Todo {
  id: string
  text: string
  completed: boolean
}

const App = (): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const dispatch = useDispatch()

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleAddTask = (): void => {
    dispatch(addTodo({ text }))
    setText('')
  }

  return (
    <div className="app">
      <InputField text={text} handleChangeText={handleChangeText} handleAddTodo={handleAddTask}/>
      <TodoList />
    </div>
  )
}

export default App
export { type Todo }
