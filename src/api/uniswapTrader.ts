import { ethers } from 'ethers'
import FACTORY_ABI from '../abis/factory.json' assert { type: 'json' }
import QUOTER_ABI from '../abis/quoter.json' assert { type: 'json' }
import SWAP_ROUTER_ABI from '../abis/swaprouter.json' assert { type: 'json' }
import POOL_ABI from '../abis/pool.json' assert { type: 'json' }
import TOKEN_IN_ABI from '../abis/tokenIn.json' assert { type: 'json' }
import { walletBalance } from './connectWalletApi'

const testnet = import.meta.env.VITE_TESTNET

const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
const QUOTER_CONTRACT_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
const SWAP_ROUTER_CONTRACT_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

const provider = new ethers.JsonRpcProvider(testnet)

const factoryContract = new ethers.Contract(POOL_FACTORY_CONTRACT_ADDRESS, FACTORY_ABI, provider)

const quoterContract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, QUOTER_ABI, provider)

const signer = new ethers.Wallet(import.meta.env.VITE_CURRENT_ADDRESS_SECRET_KEY, provider)

async function approveToken(tokenIn, tokenABI, amount, wallet) {
    const { address: tokenAddress, decimals } = tokenIn

    try {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet)

        const balance = await walletBalance(tokenContract, decimals)

        const formattedAmount = ethers.formatUnits(amount, decimals)

        if (balance) {
            if (+formattedAmount > balance) {
                throw new Error('Not enough coins!')
            }

            const approveTransaction = await tokenContract.approve.populateTransaction(
                SWAP_ROUTER_CONTRACT_ADDRESS,
                ethers.parseEther(amount.toString())
            )

            const transactionResponse = await wallet.sendTransaction(approveTransaction)

            await transactionResponse.wait()

            console.log('Approval Transaction Confirmed!')
        }
    } catch (e) {
        console.error('An error occurred during token approval:', e.message)
        throw new Error('Token approval failed')
    }
}

async function getPoolInfo(factoryContract, tokenIn, tokenOut) {
    try {
        const poolAddress = await factoryContract.getPool(tokenIn.address, tokenOut.address, 3000)

        if (!poolAddress) {
            throw new Error('Failed to get pool address')
        }

        const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider)

        const [token0, token1, fee] = await Promise.all([
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee()
        ])

        console.log(token0)

        return { poolContract, token0, token1, fee }
    } catch (e) {
        console.error('An error occurred:', e.message)
    }
}

async function quoteAndLogSwap(quoterContract, fee, signer, amountIn, tokenIn, tokenOut) {
    try {
        const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall({
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            fee: fee,
            recipient: signer.address,
            deadline: Math.floor(new Date().getTime() / 1000 + 60 * 10),
            amountIn,
            sqrtPriceLimitX96: 0
        })

        const amountOut = ethers.formatUnits(quotedAmountOut[0], tokenOut.decimals)

        return amountOut
    } catch (e) {
        console.error('An error occurred:', e.message)
    }
}

async function prepareSwapParams(poolContract, signer, amountIn, amountOut, tokenIn, tokenOut) {
    const fee = await poolContract.fee()

    if (fee) {
        return {
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            fee,
            recipient: signer.address,
            amountIn: amountIn,
            amountOutMinimum: amountOut,
            sqrtPriceLimitX96: 0
        }
    }
}

async function executeSwap(swapRouter, params, signer) {
    const transaction = await swapRouter.exactInputSingle.populateTransaction(params)

    await signer.sendTransaction(transaction)
}

export async function swapTokens(swapAmount, tokenIn, tokenOut) {
    const amountIn = ethers.parseUnits(swapAmount.toString(), tokenIn.decimals)

    try {
        await approveToken(tokenIn, TOKEN_IN_ABI, amountIn, signer)

        const { poolContract, fee } = await getPoolInfo(factoryContract, tokenIn, tokenOut)

        const quotedAmountOut = await quoteAndLogSwap(
            quoterContract,
            fee,
            signer,
            amountIn,
            tokenIn,
            tokenOut
        )

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

        await executeSwap(swapRouter, params, signer)
    } catch (e) {
        console.error('An error occurred:', e.message)
    }
}

