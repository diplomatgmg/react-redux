import React, { type ChangeEvent, useEffect, useState } from 'react'
import './css/style.css'
import TodoList from './components/TodoList'
import InputField from './components/InputField'
import { type RootState } from './redux/store'
import { fetchAddNewTask, fetchTodos } from './redux/apiRequests'
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App = (): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const { status, error } = useAppSelector((state: RootState) => state.todos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchTodos())
  }, [dispatch])

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleAddTask = (): void => {
    void dispatch(fetchAddNewTask(text))
    setText('')
  }

  return (
    <div className="app">
      <InputField text={text} handleChangeText={handleChangeText} handleAddTodo={handleAddTask}/>

      {status === 'pending' && <h2>Loading...</h2>}
      {error !== false && <h2>ERROR!!!</h2> }

      <TodoList />
    </div>
  )
}

export default App
