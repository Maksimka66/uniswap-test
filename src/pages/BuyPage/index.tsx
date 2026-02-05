import Header from '../../components/Header'
import SwapModalContent from '../../components/SwapModalContent'
import BuySellLayout from '../../shared/BuySellLayout'
import ModalWindow from '../../shared/ModalWindow'

export default function BuyPage() {
    // const [fetchCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    const defaultData = [
        { id: 1, content: '$100' },
        { id: 2, content: '$300' },
        { id: 3, content: '$1000' }
    ]

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

