import { ethers } from 'ethers'

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
        console.error(e)
    }
}

export async function getSigner() {
    try {
        const signer = await provider.getSigner()

        return signer
    } catch (e) {
        console.error(e.message)
    }
}

export async function walletBalance(tokenContract, decimals: number) {
    try {
        const balance = await tokenContract.balanceOf(address)

        const formattedBalance = ethers.formatUnits(balance, decimals)

        console.log(+formattedBalance)

        return +formattedBalance
    } catch (e) {
        console.error('An error occurred:', e.message)
    }
}

