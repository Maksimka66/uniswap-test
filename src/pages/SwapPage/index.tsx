import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'
import ModalWindow from '../../shared/ModalWindow'
import SwapModalContent from '../../components/SwapModalContent'

export default function SwapPage() {
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

