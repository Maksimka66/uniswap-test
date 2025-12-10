import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    key: '',
    allCoins: [],
    currentCoin: null,
    isModalOpen: false
}

const keySlice = createSlice({
    name: 'key',
    initialState,
    selectors: {
        selectAddress: (state) => state.key,
        selectAllCoins: (state) => state.allCoins,
        selectCurrentCoin: (state) => state.currentCoin,
        selectIsModalOpen: (state) => state.isModalOpen
    },
    reducers: {
        getKey(state, { payload }) {
            state.key = payload
        },
        removeKey(state) {
            state.key = ''
        },
        setAllCoins(state, { payload }) {
            state.allCoins = payload
        },
        setCurrentCoin(state, { payload }) {
            state.currentCoin = payload
        },
        modalWindowToogle(state, { payload }) {
            state.isModalOpen = payload
        }
    }
})

export const { getKey, removeKey, setAllCoins, setCurrentCoin, modalWindowToogle } =
    keySlice.actions

export const { selectAddress, selectAllCoins, selectCurrentCoin, selectIsModalOpen } =
    keySlice.selectors

export default keySlice.reducer

