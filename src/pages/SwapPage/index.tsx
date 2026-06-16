import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Exchanger from '../../components/Exchanger'
import Header from '../../components/Header'
import ModalWindow from '../../shared/ModalWindow'
import SwapTokensModal from '../../components/SwapTokensModal'
import { loaderToogle, selectAllCoins, setCoins, setFilteredCoins } from '../../store/slice'
import { getAllCoins } from '../../api/coinGeckoApi'

export default function SwapPage() {
    const dispatch = useDispatch()

    const coins = useSelector(selectAllCoins)

    useEffect(() => {
        if (!coins.length) {
            async function fetchTokens() {
                try {
                    dispatch(loaderToogle(true))

                    const fetchedCoins = await getAllCoins()

                    if (fetchedCoins) {
                        dispatch(setCoins(fetchedCoins))
                        dispatch(setFilteredCoins(fetchedCoins))
                    }
                } catch (e) {
                    if (e instanceof Error) {
                        console.log(e.message)
                    }
                } finally {
                    dispatch(loaderToogle(false))
                }
            }

            fetchTokens()
        }
    }, [coins.length, dispatch])

    return (
        <>
            <Header />
            <main className='flex items-center bg-main h-screen'>
                <Exchanger />
            </main>

            <ModalWindow>
                <SwapTokensModal />
            </ModalWindow>
        </>
    )
}
