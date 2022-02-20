import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from './test-utils-counter'
import App from './App'

describe('渲染计数器 <App />', () => {
  it('渲染了计数器 <App /> 的内容', () => {
    render(<App />)
    expect(screen.getByText('Counter')).toBeInTheDocument()
  })
  it('加1', () => {
    render(<App />)
    const counterResult = Number(screen.getByTestId('counterResult').textContent)
    userEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('counterResult').textContent).toEqual(`${counterResult + 1}`)
  })
  // 减1 ...
  it('奇数时增加步长数量', () => {
    render(<App />)
    const counterResult = Number(screen.getByTestId('counterResult').textContent)
    const step = Number(screen.getByTestId('counterStep').getAttribute('value'))
    if (counterResult % 2 === 0) {
      userEvent.click(screen.getByText('+'))
    }
    userEvent.click(screen.getByText('奇数时增加步长数量'))
    expect(screen.getByTestId('counterResult').textContent).toEqual(`${counterResult + step}`)
  })
  // 同步增加步长数量 ...
  it('异步增加步长数量', async () => {
    render(<App />)
    const counterResult = Number(screen.getByTestId('counterResult').textContent)
    const step = Number(screen.getByTestId('counterStep').getAttribute('value'))
    userEvent.click(screen.getByText('异步增加步长数量'))
    await waitFor(() => {
      expect(screen.getByTestId('counterResult').textContent).toEqual(`${counterResult + step}`)
    })
  })
  // 重置 ...
})
