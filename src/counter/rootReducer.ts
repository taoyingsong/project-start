/**
 * rootReducer根组织文件
 */
import { combineReducers } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
})

export default rootReducer
