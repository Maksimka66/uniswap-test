import axios from 'axios';

// axios.defaults.baseURL = 'https://tokens.uniswap.org'

export const getTokens = async () => {
    try {
        const res = await axios.get('https://tokens.uniswap.org');

        return res.data;
    } catch (e) {
        console.log(e);
    }
};
