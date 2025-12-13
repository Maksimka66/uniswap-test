import { useEffect } from 'react'
import Header from '../../components/Header'
import SwapModalContent from '../../components/SwapModalContent'
import BuySellLayout from '../../shared/BuySellLayout'
import ModalWindow from '../../shared/ModalWindow'
import { useLazyGetAllCoinsQuery } from '../../api/coinGeckoApi'
import Loader from '../../shared/Loader'

export default function SellPage() {
    const [fetchCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    const defaultData = [
        { id: 1, content: '25%' },
        { id: 2, content: '50%' },
        { id: 3, content: '75%' },
        { id: 4, content: 'Max' }
    ]

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
                <BuySellLayout disabled={true} pageLabel='You`re selling' data={defaultData} />
            </main>

            <ModalWindow>
                <SwapModalContent />
            </ModalWindow>
        </>
    )
}

