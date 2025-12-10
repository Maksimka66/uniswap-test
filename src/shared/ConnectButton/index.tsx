import { useDispatch } from 'react-redux'
import { connectWallet } from '../../api/connectWalletApi'
import { getKey } from '../../store/slice'
import type { IConnectButton } from '../../interfaces/IConnectButton/IConnectButton'

export default function ConnectButton({ children, className }: IConnectButton) {
    const dispatch = useDispatch()

    const connect = async () => {
        try {
            const res = await connectWallet()

            dispatch(getKey(res))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <button className={`rounded-[10px] font-medium font-dm ${className}`} onClick={connect}>
            {children}
        </button>
    )
}

