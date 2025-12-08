import { useSelector } from 'react-redux'
import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'
import Loader from '../../shared/Loader'
import ModalWindow from '../../shared/ModalWindow'
import SwapModalContent from '../../components/SwapModalContent'
import { selectIsLoading, selectIsModalOpen } from '../../store/slice'

export default function SwapPage() {
    const isLoading = useSelector(selectIsLoading)
    const openModal = useSelector(selectIsModalOpen)

    return (
        <>
            <Header />
            <main className='flex items-center bg-main h-screen'>
                {!isLoading ? <Exchanger /> : <Loader />}
            </main>
            {openModal && (
                <ModalWindow>{!isLoading ? <SwapModalContent /> : <Loader />}</ModalWindow>
            )}
        </>
    )
}

