import { useSelector } from 'react-redux'
import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'
import Loader from '../../shared/Loader'
import { selectIsLoading } from '../../store/slice'

export default function SwapPage() {
    const isLoading = useSelector(selectIsLoading)

    return (
        <>
            <Header />
            <main className='flex items-center bg-main h-screen'>
                {!isLoading ? <Exchanger /> : <Loader />}
            </main>
        </>
    )
}
