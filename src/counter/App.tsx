import React from 'react'
import Counter from './features/counter/Counter'
import './App.css'

const App = () => {
  return (
    <main className="app counter-app">
      <header className="header">
        <h2>Counter</h2>
      </header>
      <Counter />
    </main>
  )
}

export default App
