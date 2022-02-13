import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const Home = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

render(<Home />, document.getElementById('root'))
