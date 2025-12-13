import { useEffect } from 'react'
import { useLazyGetAllCoinsQuery } from '../../api/coinGeckoApi'
import Header from '../../components/Header'
import SwapModalContent from '../../components/SwapModalContent'
import BuySellLayout from '../../shared/BuySellLayout'
import ModalWindow from '../../shared/ModalWindow'
import Loader from '../../shared/Loader'

export default function BuyPage() {
    const [fetchCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    const defaultData = [
        { id: 1, content: '$100' },
        { id: 2, content: '$300' },
        { id: 3, content: '$1000' }
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
                <BuySellLayout pageLabel='You`re buying' data={defaultData} />
            </main>

            <ModalWindow>
                <SwapModalContent />
            </ModalWindow>
        </>
    )
}

