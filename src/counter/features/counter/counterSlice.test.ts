import counterReducer, { CounterState, increment, decrement, incrementByAmount, reset } from './counterSlice'

// const fetchCount = jest.fn().mockImplementationOnce(amount => Promise.resolve({ data: amount }))
describe('计数器reducer', () => {
  // afterEach(jest.clearAllMocks)
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  }
  // it('', async () => {
  //   const result = await fetchCount(1)
  // })
  it('初始化', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    })
  })

  it('执行increment', () => {
    const actual = counterReducer(initialState, increment())
    expect(actual.value).toEqual(4)
  })

  it('执行decrement', () => {
    const actual = counterReducer(initialState, decrement())
    expect(actual.value).toEqual(2)
  })

  it('执行incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2))
    expect(actual.value).toEqual(5)
  })

  it('执行reset', () => {
    const actual = counterReducer(initialState, reset)
    expect(actual.value).toEqual(0)
  })
})
