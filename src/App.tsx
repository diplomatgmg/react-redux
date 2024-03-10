import React, { type ChangeEvent, useEffect, useState } from 'react'
import './css/style.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import fetchTodos from './redux/thunks/fetchTodos'
import fetchAddNewTask from './redux/thunks/fetchAddNewTodo'

const App = (): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const { loading, error } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleAddTask = (): void => {
    if (text === '') {
      return
    }

    void dispatch(fetchAddNewTask(text))
    setText('')
  }

  useEffect(() => {
    void dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="app">
      <InputField text={text} handleChangeText={handleChangeText} handleAddTodo={handleAddTask}/>

      {loading && <h2>Loading...</h2>}
      {error !== null && <h2>An error occurred</h2>}

      <TodoList />
    </div>
  )
}

export default App
