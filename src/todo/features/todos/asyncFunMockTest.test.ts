import axios from 'axios'
import client from '../../api/client'
import { swapiGetterAPI } from './asyncFunMockTest'
import { fetchTodosAPI } from './TodoAPI'

/** 使用axios库的 swapiGetterAPI 的3种测试方法，推荐第2种 * */
// // 方法1
// jest.mock('axios', () => ({
//   __esModule: true,
//   default: {
//     get: jest.fn().mockResolvedValue({ data: { name: 'Luke Skywalkerrr' } }),
//   },
// }))

// // 方法2：推荐
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
mockAxios.get.mockResolvedValue({ data: { name: 'Luke Skywalker' } })

// // 方法3
// jest.mock('axios')
// const mockAxios = axios as jest.Mocked<typeof axios>
// mockAxios.get.mockImplementation(() => Promise.resolve({ data: { name: 'Luke Skywalker' } }))

/** 使用自定义的client调用 的3种测试方法，同上边的类似 * */
const todos = [{ id: 1, color: 'red', completed: true, text: 'st-t1' }]
// // 方法2
jest.mock('../../api/client')
const mockClient = client as jest.Mocked<typeof client>
mockClient.get.mockImplementation(() => Promise.resolve({ todos }))
// // 方法3
// jest.mock('../../api/client')
// const mockClient = client as jest.Mocked<typeof client>
// mockClient.get.mockResolvedValue({ todos: [{ id: 1, color: 'red', completed: true, text: 'st-t1' }] })

describe('测试swapiGetterAPI', () => {
  afterEach(jest.clearAllMocks)
  it('验证调用swapiGetterAPI结果', async () => {
    const result = await swapiGetterAPI(1)
    // // swapiGetterAPI result: Luke Skywalker
    // console.log('swapiGetterAPI result:', result)
    expect(result).toBe('Luke Skywalker')
  })
  it('验证clientAPI调用结果', async () => {
    const result = await fetchTodosAPI()
    // 如果 fetchTodosAPI 中有数据处理逻辑，这里是可以进行验证的
    expect(result).toEqual(todos)
  })
})
