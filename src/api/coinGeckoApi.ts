import axios from 'axios'

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'

// axios.defaults.headers.common['x-cg-demo-api-key'] = import.meta.env.VITE_COINGECKO_API_KEY

export const getAllCoins = async () => {
    try {
        const res = await axios.get(
            'https://api.coingecko.com/api/v3/coins/list?include_platform=true'
        )

        return res.data
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export const getMarketData = async (contractAddress: string) => {
    try {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=usd`
            // {
            //     headers: {
            //         'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
            //     }
            // }
        )

        return res.data
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export const getCurrentCoin = async (id: string) => {
    try {
        const res = await axios.get(`/coins/${id}`)

        return res.data
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

