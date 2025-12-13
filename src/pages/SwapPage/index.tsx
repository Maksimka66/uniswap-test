import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'
import ModalWindow from '../../shared/ModalWindow'
import SwapModalContent from '../../components/SwapModalContent'
import { useEffect } from 'react'
import { useLazyGetAllCoinsQuery } from '../../api/coinGeckoApi'
import Loader from '../../shared/Loader'

export default function SwapPage() {
    const [fetchCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    useEffect(() => {
        async function getCoins() {
            try {
                await fetchCoins({})
            } catch (e) {
                console.error(e)
            }
        }

        getCoins()
    }, [fetchCoins])

    if (isFetching) {
        return (
            <div className='flex items-center bg-main h-screen'>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <Header />
            <main className='flex items-center bg-main h-screen'>
                <Exchanger />
            </main>

            <ModalWindow>
                <SwapModalContent />
            </ModalWindow>
        </>
    )
}

