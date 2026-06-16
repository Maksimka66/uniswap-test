import axios from 'axios'

axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'

axios.defaults.headers.common['x-cg-demo-api-key'] = import.meta.env.VITE_COINGECKO_API_KEY

export const getAllCoins = async () => {
    try {
        const res = await axios.get('/token_lists/ethereum/all.json')

        return res.data.tokens
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export const getMarketData = async (contractAddress: string) => {
    try {
        const res = await axios.get(
            `/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=usd`
        )

        return res.data
    } catch (e) {
        if (e instanceof Error) {
            console.error(e)
        }
    }
}

export const getCurrentCoin = async (address: string) => {
    try {
        const res = await axios.get(`/onchain/networks/eth/tokens/${address}`)

        return res.data
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}
