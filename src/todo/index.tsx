import React from 'react'
import { Provider } from 'react-redux'
import './api/server'
import { fetchTodos } from './features/todos/todosSlice'
// import configureAppStore from './store'
import store from './store'
// eslint-disable-next-line import/no-cycle
import App from './App'

store.dispatch(fetchTodos())

const Todo = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

export default React.memo(Todo)
