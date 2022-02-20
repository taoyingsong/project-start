import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const count = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

export default React.memo(count)
