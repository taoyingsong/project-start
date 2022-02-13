import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Operations from './features/operations/Operations'
import Footer from './features/footer/Footer'
import NoMatch from '../common/component/noMatch/NoMatch'
import './App.less'

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
    <main className="App todoapp">
      <Header />
      <Operations />
      <TodoList />
      <Footer />
    </main>
  )
}

export default React.memo(App)
