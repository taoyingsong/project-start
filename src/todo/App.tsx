import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import NoMatch from '@src/common/component/noMatch/NoMatch'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Operations from './features/operations/Operations'
import Footer from './features/footer/Footer'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<TodoPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
const AppLayout = () => {
  return <Outlet />
}
const TodoPage = () => {
  return (
    <main className="app todo-app">
      <Header />
      <Operations />
      <TodoList />
      <Footer />
    </main>
  )
}

export default React.memo(App)
