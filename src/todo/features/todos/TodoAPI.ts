import client from '../../api/client'

export interface ITodo {
  id: number
  color: string
  completed: boolean
  text: string
}

export async function fetchTodosAPI() {
  const response = await client.get('/fakeApi/todos')
  const result: ITodo[] = response.todos
  return result
}

export async function saveNewTodoAPI(text: string) {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  const result: ITodo = response.todo
  return result
}
