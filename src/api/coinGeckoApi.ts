import axios from 'axios'

axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'

axios.defaults.headers.common['x-cg-demo-api-key'] = import.meta.env.VITE_COINGECKO_API_KEY

export async function getAllCoinsService() {
    try {
        const res = await axios.get('/coins/markets', {
            params: {
                vs_currency: 'usd'
            }
        })

        return res.data
    } catch (e) {
        console.error(e)
    }
}

export async function getCurrentCoinService(id: string) {
    try {
        const res = await axios.get(`/coins/${id}`)

        return res.data
    } catch (e) {
        console.error(e)
    }
}

