// import store from './store'
// import customRenderGenerator from '../common/testUtils/customRenderGenerator'
//
// const customRender = customRenderGenerator(store)
// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { customRender as render }

import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
// Import your own reducer
import rootReducer from './rootReducer'

function render(
  ui,
  {
    preloadedState = undefined,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
