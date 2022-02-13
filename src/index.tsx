import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

console.log('in project begin ...........')
// const renderApp = () => {
const Home = () => {
  console.log('in project begin home ...........')
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

render(<Home />, document.getElementById('root'))
// }
//
// renderApp()
