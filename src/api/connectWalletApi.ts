import { Contract, ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum)

const address = import.meta.env.VITE_CURRENT_ADDRESS

export async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert('Install MetaMask!!!')
        }

        const address = await provider.send('eth_requestAccounts', [])

        return address[0]
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

export async function getSigner() {
    try {
        const signer = await provider.getSigner()

        return signer
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

