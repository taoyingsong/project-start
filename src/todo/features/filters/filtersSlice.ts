import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CheckboxValueType = string | number | boolean
export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}
interface SFilterState {
  status: string
  colors: CheckboxValueType[]
}
const initialState: SFilterState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action: PayloadAction<string>) {
      state.status = action.payload
    },
    colorsFilterChanged(state, action: PayloadAction<CheckboxValueType[]>) {
      state.colors = action.payload
    },
    colorFilterChanged: {
      reducer(state, action: PayloadAction<{ color: string; changeType: string }>) {
        const { color, changeType } = action.payload
        const { colors } = state
        switch (changeType) {
          case 'added': {
            if (!colors.includes(color)) {
              colors.push(color)
            }
            break
          }
          case 'removed':
            state.colors = colors.filter((existingColor: CheckboxValueType) => existingColor !== color)
            break
          default:
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        }
      },
    },
  },
})

export const { colorFilterChanged, colorsFilterChanged, statusFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer
