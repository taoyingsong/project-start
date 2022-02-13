// eslint-disable-next-line import/no-import-module-exports
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-cycle,import/no-import-module-exports
import rootReducer from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
}

// export default function configureAppStore() {

// const store = configureStore({
//   reducer: rootReducer,
// })
// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
//
// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
// }

// hot reloading ：感觉这个逻辑方这个位置不大合适，后边需要专项分析
// if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
//   ;(module as any).hot.accept('./rootReducer', () => {
//     // eslint-disable-next-line global-require
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
//   // module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
// }
// return store
// }
export default store

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
