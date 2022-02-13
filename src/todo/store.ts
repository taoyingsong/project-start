// eslint-disable-next-line import/no-import-module-exports
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-import-module-exports
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
}
export default store
