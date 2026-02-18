import { Contract, ethers } from 'ethers'
import { toast } from 'react-toastify'

const address = import.meta.env.VITE_CURRENT_ADDRESS

function createProvider() {
    try {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)

            return provider
        } else {
            toast.error('You need to install MetaMask first!')

            return null
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message)

            toast.error('Network error, please try again')
        }
    }
}

export async function connectWallet() {
    try {
        const provider = createProvider()

        if (provider) {
            const address = await provider.send('eth_requestAccounts', [])

            return address[0]
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export async function getSigner() {
    try {
        const provider = createProvider()

        if (provider) {
            const signer = await provider.getSigner()

            return signer
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export async function walletBalance(tokenContract: Contract, decimals: number) {
    try {
        const balance = await tokenContract.balanceOf(address)

        const formattedBalance = ethers.formatUnits(balance, decimals)

        return +formattedBalance
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred:', e.message)
        }
    }
}
