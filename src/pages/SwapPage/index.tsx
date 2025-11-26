import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'

export default function SwapPage() {
    return (
        <>
            <Header />
            <main className='flex items-center bg-main h-screen'>
                <Exchanger />
            </main>
        </>
    )
}
