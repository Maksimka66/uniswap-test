import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: '',
    allCoins: [],
    filteredCoins: [],
    buttonId: '',
    sellCoin: null,
    buyCoin: null,
    isModalOpen: false
}

const keySlice = createSlice({
    name: 'key',
    initialState,
    selectors: {
        selectAddress: (state) => state.address,
        selectAllCoins: (state) => state.allCoins,
        selectFilteredCoins: (state) => state.filteredCoins,
        selectButtonId: (state) => state.buttonId,
        selectSellCoin: (state) => state.sellCoin,
        selectBuyCoin: (state) => state.buyCoin,
        selectIsModalOpen: (state) => state.isModalOpen
    },
    reducers: {
        getKey(state, { payload }) {
            state.address = payload
        },
        removeKey(state) {
            state.address = ''
        },
        modalWindowToogle(state, { payload }) {
            state.isModalOpen = payload
        },
        setCoins(state, { payload }) {
            state.allCoins = payload
        },
        setFilteredCoins(state, { payload }) {
            state.filteredCoins = payload
        },
        setCurrentCoin(state, { payload }) {
            if (state.buttonId === 'sell') {
                if (state.buyCoin?.address === payload.address) {
                    state.sellCoin = payload
                    state.buyCoin = null
                } else {
                    state.sellCoin = payload
                }
            }

            if (state.buttonId === 'buy') {
                if (state.sellCoin?.address === payload.address) {
                    state.buyCoin = payload
                    state.sellCoin = null
                } else {
                    state.buyCoin = payload
                }
            }
        },
        setButtonId(state, { payload }) {
            state.buttonId = payload
        }
    }
})

export const {
    getKey,
    removeKey,
    modalWindowToogle,
    setCoins,
    setFilteredCoins,
    setButtonId,
    setCurrentCoin
} = keySlice.actions

export const {
    selectAddress,
    selectAllCoins,
    selectFilteredCoins,
    selectButtonId,
    selectSellCoin,
    selectBuyCoin,
    selectIsModalOpen
} = keySlice.selectors

export default keySlice.reducer

