import React, { type ChangeEvent, type FC, type ReactElement } from 'react'

interface InputFieldProps {
  text: string
  handleChangeText: (e: ChangeEvent<HTMLInputElement>) => void
  handleAddTodo: () => void
}

const InputField: FC<InputFieldProps> = ({ text, handleChangeText, handleAddTodo }): ReactElement => {
  return (
    <label>
      <input type="text" value={text} onChange={handleChangeText}/>
      <button onClick={handleAddTodo}>Add todo</button>
    </label>
  )
}

export default InputField
