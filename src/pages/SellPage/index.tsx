import Header from '../../components/Header'
import SwapModalContent from '../../components/SwapModalContent'
import BuySellLayout from '../../shared/BuySellLayout'
import ModalWindow from '../../shared/ModalWindow'

export default function SellPage() {
    const defaultData = [
        { id: 1, content: '25%' },
        { id: 2, content: '50%' },
        { id: 3, content: '75%' },
        { id: 4, content: 'Max' }
    ]

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

