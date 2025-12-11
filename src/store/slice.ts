import { createSlice } from '@reduxjs/toolkit'
import { coinGeckoApi } from '../api/coinGeckoApi'

const initialState = {
    key: '',
    allCoins: [],
    tokenButtonId: 0,
    firstCoin: null,
    secondCoin: null,
    isModalOpen: false
}

const keySlice = createSlice({
    name: 'key',
    initialState,
    selectors: {
        selectAddress: (state) => state.key,
        selectAllCoins: (state) => state.allCoins,
        selectFirstCoin: (state) => state.firstCoin,
        selectSecondCoin: (state) => state.secondCoin,
        selectIsModalOpen: (state) => state.isModalOpen
    },
    reducers: {
        getKey(state, { payload }) {
            state.key = payload
        },
        removeKey(state) {
            state.key = ''
        },
        setTokenButtonId(state, { payload }) {
            state.tokenButtonId = payload
        },
        modalWindowToogle(state, { payload }) {
            state.isModalOpen = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            coinGeckoApi.endpoints.getAllCoins.matchFulfilled,
            (state, { payload }) => {
                state.allCoins = payload
            }
        )

        builder.addMatcher(
            coinGeckoApi.endpoints.getCurrentCoin.matchFulfilled,
            (state, { payload }) => {
                if (!state.firstCoin || state.tokenButtonId === 1) {
                    state.firstCoin = payload
                }

                if (state.tokenButtonId === 2) {
                    state.secondCoin = payload
                }

                // if (state.firstCoin && state.firstCoin.id === state.secondCoin.id) {
                //     console.log(state.firstCoin.id)
                //     console.log(payload.id)
                // }
            }
        )
    }
})

export const { getKey, removeKey, setTokenButtonId, modalWindowToogle } = keySlice.actions

export const {
    selectAddress,
    selectAllCoins,
    selectFirstCoin,
    selectSecondCoin,
    selectIsModalOpen
} = keySlice.selectors

export default keySlice.reducer

