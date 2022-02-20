import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Input } from 'antd'
import { saveNewTodo } from '../todos/todosSlice'

const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setText(e.target.value)
  }

  const handleKeyDown = async (e: { which: number }) => {
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      setText('')
      setStatus('idle')
    }
  }

  const isLoading = status === 'loading'
  const placeholder = isLoading ? '' : '需要做什么?'
  const loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="todo-header" data-testid="todoHeader">
      <h2>Todo List</h2>
      <Input
        style={{ width: '40%' }}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onPressEnter={handleKeyDown}
        disabled={isLoading}
        size="large"
      />
      {loader}
    </header>
  )
}

export default React.memo(Header)
