/**
 * rootReducer根组织文件
 */
import { combineReducers } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
