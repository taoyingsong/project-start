import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

import { RootState } from '../../rootReducer'

interface ITodo {
  id: number
  color: string
  completed: boolean
  text: string
}
interface IEntities {
  [key: number]: ITodo
}

const todosAdapter = createEntityAdapter<ITodo>()

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  ids: [] as number[],
  entities: {} as IEntities,
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos as ITodo[]
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (text: string) => {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  return response.todo as ITodo
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action: PayloadAction<number>) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    todoColorSelected: {
      reducer(state, action: PayloadAction<{ color: string; todoId: number }>) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state) {
      Object.values(state.entities).forEach(todo => {
        todo!.completed = true
      })
    },
    completedTodosCleared(state) {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo!.completed)
        .map(todo => todo!.id)
      todosAdapter.removeMany(state, completedIds)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  },
})

export const { allTodosCompleted, completedTodosCleared, todoColorSelected, todoDeleted, todoToggled } =
  todosSlice.actions

export default todosSlice.reducer

export const { selectAll: selectTodos, selectById: selectTodoById } = todosAdapter.getSelectors(
  (state: RootState) => state.todos
)

export const selectTodoIds = createSelector(selectTodos, todos => todos.map(todo => todo.id))

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state: RootState) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    return todos.filter(todo => {
      const statusMatches = showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(selectFilteredTodos, filteredTodos =>
  filteredTodos.map(todo => todo.id)
)
