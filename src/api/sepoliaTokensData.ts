import type { IToken } from '../interfaces/ITokens/ITokens'

const chainId = 11155111

export const sepoliaTokensData: IToken[] = [
    {
        address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        chainId,
        decimals: 6,
        name: 'USDCoin',
        symbol: 'USDC',
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
        usd: 0.999861
    },
    {
        address: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
        chainId,
        decimals: 18,
        name: 'Wrapped Ether',
        symbol: 'WETH',
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        usd: 1943.93
    },
    {
        address: '0xf1edc78dd8ffd39613c63dd0b2a6c58e6da0d5a8',
        chainId,
        decimals: 18,
        name: '1inch',
        symbol: '1INCH',
        logoURI: 'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
        usd: 0.093994
    },
    {
        address: '0x94896766Ca0AF299BFE68BD6cdD6D679Fe025d3a',
        chainId,
        decimals: 18,
        name: 'Ancient8',
        symbol: 'A8',
        logoURI:
            'https://assets.coingecko.com/coins/images/39170/standard/A8_Token-04_200x200.png?1720798300',
        usd: 0.01176968
    },
    {
        address: '0x82fb927676b53b6ee07904780c7be9b4b50db80b',
        chainId,
        decimals: 18,
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
        usd: 0.999777
    },
    {
        address: '0xA1d7f71cbBb361A77820279958BAC38fC3667c1a',
        chainId,
        decimals: 6,
        name: 'Tether USD',
        symbol: 'USDT',
        logoURI:
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
        usd: 0.99958
    }
]

