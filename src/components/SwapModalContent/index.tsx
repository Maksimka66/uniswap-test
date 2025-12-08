import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ICoinInfo } from '../../interfaces/ICoinInfo/ICoinInfo'
import Loader from '../../shared/Loader'
import { getAllCoinsService } from '../../api/coinGeckoApi'
import { loaderToogle, selectIsLoading } from '../../store/slice'

export default function SwapModalContent() {
    const [coins, setCoins] = useState([])

    const loader = useSelector(selectIsLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchCoins() {
            try {
                const res = await getAllCoinsService()

                dispatch(loaderToogle(true))

                if (res) {
                    console.log(res)

                    setCoins(res)
                }
            } catch (e) {
                console.error(e)
            } finally {
                dispatch(loaderToogle(false))
            }
        }

        fetchCoins()
    }, [dispatch])

    if (loader) {
        return <Loader />
    }

    return (
        <>
            <ul>
                {coins.map((coin: ICoinInfo) => (
                    <li key={coin.id} className='flex gap-4 items-center'>
                        <img
                            src={coin.image}
                            alt={`${coin.name} image`}
                            className='w-[36px] h-[36px]'
                        />
                        <div>
                            <span className='font-dm text-[#131313]'>{coin.name}</span>
                            <span className='font-dm text-[#131313]'>{coin.symbol}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

