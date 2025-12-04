export const connectWallet = async () => {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

            if (accounts) {
                console.log(accounts)

                return accounts[0]
            }
        } else {
            console.log('Install MetaMask!')
        }
    } catch (e) {
        console.error(e)
    }
}

