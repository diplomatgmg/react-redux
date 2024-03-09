import React, { type ChangeEvent, useEffect, useState } from 'react'
import './css/style.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { useAppDispatch } from './redux/hooks'
import fetchTodos from './redux/thunks/fetchTodos'
import fetchAddNewTask from './redux/thunks/fetchAddNewTask'

const App = (): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleAddTask = (): void => {
    void dispatch(fetchAddNewTask(text))
    setText('')
  }

  useEffect(() => {
    void dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="app">
      <InputField text={text} handleChangeText={handleChangeText} handleAddTodo={handleAddTask}/>

      <TodoList />
    </div>
  )
}

export default App
