import { Contract, ethers, FeeData, Wallet, type InterfaceAbi } from 'ethers'
import { toast } from 'react-toastify'
import FACTORY_ABI from '../abis/factory.json' assert { type: 'json' }
import QUOTER_ABI from '../abis/quoter.json' assert { type: 'json' }
import SWAP_ROUTER_ABI from '../abis/swaprouter.json' assert { type: 'json' }
import POOL_ABI from '../abis/pool.json' assert { type: 'json' }
import TOKEN_IN_ABI from '../abis/tokenIn.json' assert { type: 'json' }
import { walletBalance } from './connectWalletApi'
import type { IPoolInfo, IParams, IToken } from '../interfaces/ITokens/ITokens'

const testnet = import.meta.env.VITE_TESTNET

const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
const QUOTER_CONTRACT_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
const SWAP_ROUTER_CONTRACT_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

const provider = new ethers.JsonRpcProvider(testnet)

const factoryContract = new ethers.Contract(POOL_FACTORY_CONTRACT_ADDRESS, FACTORY_ABI, provider)

const quoterContract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, QUOTER_ABI, provider)

const signer = new ethers.Wallet(import.meta.env.VITE_CURRENT_ADDRESS_SECRET_KEY, provider)

async function approveToken(
    tokenIn: IToken,
    tokenABI: InterfaceAbi,
    amount: bigint,
    wallet: Wallet
) {
    const { address: tokenAddress, decimals } = tokenIn

    try {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet)

        const balance = await walletBalance(tokenContract, decimals)

        const formattedAmount = ethers.formatUnits(amount, decimals)

        if (balance && +formattedAmount < balance) {
            const approveTransaction = await tokenContract.approve.populateTransaction(
                SWAP_ROUTER_CONTRACT_ADDRESS,
                ethers.parseEther(amount.toString())
            )

            const transactionResponse = await wallet.sendTransaction(approveTransaction)

            const res = await transactionResponse.wait()

            return res
        } else {
            toast.error('Not enough funds!')
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}

async function getPoolInfo(
    factoryContract: Contract,
    tokenIn: IToken,
    tokenOut: IToken
): Promise<IPoolInfo> {
    try {
        const poolAddress = await factoryContract.getPool(tokenIn.address, tokenOut.address, 3000)

        if (!poolAddress) {
            throw new Error('Failed to get pool address!')
        }

        const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider)

        const [token0, token1, fee] = await Promise.all([
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee()
        ])

        return { poolContract, token0, token1, fee }
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message)
        }

        throw e
    }
}

async function quoteAndLogSwap(
    quoterContract: Contract,
    fee: FeeData,
    signer: Wallet,
    amountIn: bigint,
    tokenIn: IToken,
    tokenOut: IToken
) {
    try {
        const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall({
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            fee,
            recipient: signer.address,
            deadline: Math.floor(new Date().getTime() / 1000 + 60 * 10),
            amountIn,
            sqrtPriceLimitX96: 0
        })

        const amountOut = ethers.formatUnits(quotedAmountOut[0], tokenOut.decimals)

        return amountOut
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message)
        }
    }
}

async function prepareSwapParams(
    poolContract: Contract,
    signer: Wallet,
    amountIn: bigint,
    amountOut: string,
    tokenIn: IToken,
    tokenOut: IToken
): Promise<IParams> {
    try {
        const fee = await poolContract.fee()

        if (!fee) {
            throw new Error('No such fee for this transaction!')
        }

        return {
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            fee,
            recipient: signer.address,
            amountIn,
            amountOutMinimum: amountOut,
            sqrtPriceLimitX96: 0
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message)
        }

        throw e
    }
}

async function executeSwap(swapRouter: Contract, params: IParams, signer: Wallet) {
    try {
        const transaction = await swapRouter.exactInputSingle.populateTransaction(params)

        const txRes = await signer.sendTransaction(transaction)

        console.log(txRes)

        return txRes
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message, 'Transaction has been failed!')
        }
    }
}

export async function swapTokens(swapAmount: string, tokenIn: IToken, tokenOut: IToken) {
    const amountIn = ethers.parseUnits(swapAmount.toString(), tokenIn.decimals)

    try {
        const a = await approveToken(tokenIn, TOKEN_IN_ABI, amountIn, signer)

        console.log(a)

        const { poolContract, fee } = await getPoolInfo(factoryContract, tokenIn, tokenOut)

        const quotedAmountOut = await quoteAndLogSwap(
            quoterContract,
            fee,
            signer,
            amountIn,
            tokenIn,
            tokenOut
        )

        if (quotedAmountOut) {
            const params = await prepareSwapParams(
                poolContract,
                signer,
                amountIn,
                quotedAmountOut[0].toString(),
                tokenIn,
                tokenOut
            )

            const swapRouter = new ethers.Contract(
                SWAP_ROUTER_CONTRACT_ADDRESS,
                SWAP_ROUTER_ABI,
                signer
            )

            const res = await executeSwap(swapRouter, params, signer)

            return res
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message)

            if (e.toString().includes('-32004')) {
                toast.error('Network error, please try again')
            }

            console.log(e instanceof Error)

            // console.log(e.status)

            // проверить на статус 500!!!

            throw e
        }
    }
}
