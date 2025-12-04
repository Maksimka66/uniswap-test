import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    key: '',
    isLoading: false
}

const keySlice = createSlice({
    name: 'key',
    initialState,
    selectors: {
        selectKey: (state) => state.key,
        selectIsLoading: (state) => state.isLoading
    },
    reducers: {
        getKey(state, { payload }) {
            state.key = payload
        },
        removeKey(state) {
            state.key = ''
        },
        loaderToogle(state, { payload }) {
            state.isLoading = payload
        }
    }
})

export const { getKey, removeKey, loaderToogle } = keySlice.actions
export const { selectKey, selectIsLoading } = keySlice.selectors

export default keySlice.reducer

