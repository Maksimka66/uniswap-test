import type { Contract, FeeData } from 'ethers'

interface ITokenAddress {
    tokenAddress: string
}

export interface IPoolInfo {
    poolContract: Contract
    fee: FeeData
    token0: string
    token1: string
}

export interface IParams {
    fee: FeeData
    tokenIn: string
    tokenOut: string
    recipient: string
    amountIn: bigint
    amountOutMinimum: string
    sqrtPriceLimitX96: number
}

export interface IToken {
    address: string
    chainId: number
    decimals: number
    extensions: {
        bridgeInfo: {
            10?: ITokenAddress
            56?: ITokenAddress
            130?: ITokenAddress
            137?: ITokenAddress
            8453?: ITokenAddress
            42161?: ITokenAddress
            43114?: ITokenAddress
        }
    }
    logoURI: string
    name: string
    symbol: string
}

