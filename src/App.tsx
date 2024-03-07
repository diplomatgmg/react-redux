import React, { type ChangeEvent, useEffect, useState } from 'react'
import './css/style.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { useDispatch } from 'react-redux'
import { addTodo, fetchTodos } from './redux/todoSlice'
import { type AppDispatch } from './redux/store'

interface Todo {
  id: string
  title: string
  completed: boolean
}

const App = (): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    void dispatch(fetchTodos())
  }, [dispatch])

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleAddTask = (): void => {
    dispatch(addTodo({ title: text }))
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
