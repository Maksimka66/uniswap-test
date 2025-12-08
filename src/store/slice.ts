import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    key: '',
    isLoading: false,
    isModalOpen: false
}

const keySlice = createSlice({
    name: 'key',
    initialState,
    selectors: {
        selectAddress: (state) => state.key,
        selectIsLoading: (state) => state.isLoading,
        selectIsModalOpen: (state) => state.isModalOpen
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
        },
        modalWindowToogle(state, { payload }) {
            state.isModalOpen = payload
        }
    }
})

export const { getKey, removeKey, loaderToogle, modalWindowToogle } = keySlice.actions

export const { selectAddress, selectIsLoading, selectIsModalOpen } = keySlice.selectors

export default keySlice.reducer

