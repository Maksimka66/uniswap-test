import axios from 'axios'

axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'

export const check = async () => {
    const res = await axios.get('/ping')

    console.log(res.data)
}

