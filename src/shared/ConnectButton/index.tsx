import { useDispatch } from 'react-redux'
import { connectWallet } from '../../api/connectWalletApi'
import { getKey, loaderToogle } from '../../store/slice'
import type { IConnectButton } from '../../interfaces/IConnectButton/IConnectButton'

export default function ConnectButton({ children, className }: IConnectButton) {
    const dispatch = useDispatch()

    const connect = async () => {
        try {
            dispatch(loaderToogle(true))

            const res = await connectWallet()

            dispatch(getKey(res))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(loaderToogle(false))
        }
    }

    return (
        <button className={`rounded-[10px] font-medium font-dm ${className}`} onClick={connect}>
            {children}
        </button>
    )
}

