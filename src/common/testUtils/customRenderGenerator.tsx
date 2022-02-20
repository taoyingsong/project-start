import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const newWrapper = (store: any = {}): FC => {
  return ({ children }) => {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }
}

const customRenderGenerator = (store: any) => {
  return (ui: any, options?: Omit<RenderOptions, 'wrapper'>) => {
    const Wrapper = newWrapper(store || {})
    return render(ui, { wrapper: Wrapper, ...options })
  }
}

export default customRenderGenerator
