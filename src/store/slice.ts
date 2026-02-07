import { createSlice } from '@reduxjs/toolkit'
import type { IToken } from '../interfaces/ITokens/ITokens'

interface IState {
    address: string
    allCoins: IToken[]
    filteredCoins: IToken[]
    buttonId: string
    sellCoin: IToken | null
    buyCoin: IToken | null
    isModalOpen: boolean
    loader: boolean
}

const initialState: IState = {
    address: '',
    allCoins: [],
    filteredCoins: [],
    buttonId: '',
    sellCoin: null,
    buyCoin: null,
    isModalOpen: false,
    loader: false
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
        selectIsModalOpen: (state) => state.isModalOpen,
        selectLoader: (state) => state.loader
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
        loaderToogle(state, { payload }) {
            state.loader = payload
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
    setCurrentCoin,
    loaderToogle
} = keySlice.actions

export const {
    selectAddress,
    selectAllCoins,
    selectFilteredCoins,
    selectButtonId,
    selectSellCoin,
    selectBuyCoin,
    selectIsModalOpen,
    selectLoader
} = keySlice.selectors

export default keySlice.reducer

