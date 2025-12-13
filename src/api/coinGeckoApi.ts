import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coingecko.com/api/v3',
        headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
        }
    }),
    endpoints: (build) => ({
        getAllCoins: build.query({
            query: () => '/coins/markets?vs_currency=usd'
        }),
        getCurrentCoin: build.query({
            query: (id) => `/coins/${id}`
        })
    })
})

export const { useLazyGetAllCoinsQuery, useLazyGetCurrentCoinQuery } = coinGeckoApi

