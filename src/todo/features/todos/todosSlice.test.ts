import todoReducer, { IEntities, todoToggled } from './todosSlice'
import { fetchTodosAPI, saveNewTodoAPI } from './TodoAPI'
import client from '../../api/client'

// 三种mock方式见上边asyncFunMockTest.test.ts 还有一种是把mock函数写在__mock__文件中，见外边的App.test.tsx
const todos = [{ id: 1, color: 'red', completed: true, text: 'st-t1' }]
jest.mock('../../api/client')
const mockClient = client as jest.Mocked<typeof client>
mockClient.get.mockImplementation(() => Promise.resolve({ todos }))

describe('todo reducer测试', () => {
  const previousState: {
    status: string
    ids: number[]
    entities: IEntities
  } = {
    status: 'idle',
    ids: [1],
    entities: {
      1: { id: 1, color: 'red', completed: true, text: 'st-t1' },
    },
  }
  it('验证clientAPI调用结果', async () => {
    const result = await fetchTodosAPI()
    // 如果 fetchTodosAPI 中有数据处理逻辑，这里是可以进行验证的
    expect(result).toEqual(todos)
  })
  it('初始化', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      status: 'idle',
      ids: [],
      entities: {},
    })
  })
  it('执行todoToggled', () => {
    // @ts-ignore
    const todo = todoReducer(previousState, todoToggled(1))
    expect(todo.entities[1].completed).toEqual(false)
  })
  // ...
})
