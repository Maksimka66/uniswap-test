import { useDispatch } from 'react-redux'
import { connectWallet } from '../../api/connectWalletApi'
import { getKey } from '../../store/slice'
import type { IConnectButton } from '../../interfaces/IConnectButton/IConnectButton'

export default function ConnectButton({ children, className, disabled }: IConnectButton) {
    const dispatch = useDispatch()

    const connect = async () => {
        try {
            const res = await connectWallet()

            if (res) {
                dispatch(getKey(res))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <button
            disabled={disabled}
            className={`rounded-[10px] font-medium font-dm disabled:bg-[#1313131a] disabled:text-[#131313] ${className}`}
            onClick={connect}
        >
            {children}
        </button>
    )
}

