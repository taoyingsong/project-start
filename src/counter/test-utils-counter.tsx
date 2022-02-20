import store from './store'
import customRenderGenerator from '../common/testUtils/customRenderGenerator'

const customRender = customRenderGenerator(store)
// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
