import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved, fireEvent } from './test-utils-todo'
import App from './App'
import '../__mocks__/matchMedia'
import client from './api/client'
import { mockClient, mockTodos } from '../__mocks__/client'

jest.mock('./api/client')
client.get = mockClient.get
client.post = mockClient.post

beforeEach(() => {
  jest.useFakeTimers()
})
afterEach(() => {
  jest.clearAllMocks()
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
describe('渲染todo <App />', () => {
  it('渲染了todo <App /> 内容', () => {
    render(<App />)
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument()
    expect(screen.getByText(/剩余的待办事项: 0项/)).toBeInTheDocument()
  })
  it('渲染了todolist', async () => {
    render(<App />)

    // // 下边await之前：剩余的待办事项: 0项； 之后：剩余的待办事项: 2项。
    // const node = screen.getByTestId('todoFooter')
    // screen.debug(node)

    expect(client.get).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.getByText(/剩余的待办事项: 2项/)).toBeInTheDocument())

    // // 下边这句可以放在waitFor中，或者放在waitFor下也是等上边await执行完后才执行的
    expect(screen.getByText(mockTodos[0].text)).toBeInTheDocument()

    // const node1 = screen.getByTestId('todoFooter')
    // screen.debug(node1)
  })
  it('删除一个todo', async () => {
    render(<App />)
    expect(client.get).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.getByText(/剩余的待办事项: 2项/)).toBeInTheDocument())
    const { text, completed } = mockTodos[0]
    userEvent.click(screen.queryAllByText('删除')[0])
    expect(screen.queryByText(text)).not.toBeInTheDocument()
    expect(screen.getByText(/剩余的待办事项: 1项/)).toBeInTheDocument()
  })
  it('新增一个todo', async () => {
    render(<App />)
    expect(client.get).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.getByText(/剩余的待办事项: 2项/)).toBeInTheDocument())
    const inputNode = screen.getByPlaceholderText('需要做什么?')

    // // 下边是可以的
    // fireEvent.change(inputNode, { target: { value: 'st-ttttt' } })

    // // 下边两个都可以，右边的不行-->fireEvent.keyPress(inputNode, { key: 'Enter', code: 13, charCode: 13 })
    // fireEvent.keyDown(inputNode, { key: 'Enter', keyCode: 13 })

    // // 下边会一个字母一个字母键入
    // userEvent.type(inputNode, 'st-ttttt')

    userEvent.paste(inputNode, 'st-ttttt')
    userEvent.type(inputNode, '{enter}')
    expect(client.post).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.getByText(/st-ttttt/i)).toBeInTheDocument())
  })
})
