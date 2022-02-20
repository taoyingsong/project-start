import { nanoid } from '@reduxjs/toolkit'

export const mockTodos = [
  { id: 1, color: 'red', completed: false, text: 'st-t1' },
  { id: 2, color: 'green', completed: false, text: 'st-t2' },
]
export const mockClient = {
  get: jest.fn().mockImplementation(url => {
    switch (url) {
      case '/fakeApi/todos':
        return new Promise(resolve => {
          setTimeout(() => resolve({ todos: mockTodos }))
        })
      default:
        throw new Error(`UNMATCHED URL: ${url}`)
    }
  }),
  post: jest.fn().mockImplementation((url, params) => {
    switch (url) {
      case '/fakeApi/todos':
        return new Promise(resolve => {
          setTimeout(() => resolve({ todo: { id: nanoid(), color: 'blue', completed: false, text: params.todo.text } }))
        })
      default:
        throw new Error(`UNMATCHED URL: ${url}`)
    }
  }),
}
