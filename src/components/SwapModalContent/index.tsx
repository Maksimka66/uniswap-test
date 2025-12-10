import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ICoinInfo } from '../../interfaces/ICoinInfo/ICoinInfo'
import Loader from '../../shared/Loader'
import { useLazyGetAllCoinsQuery } from '../../api/coinGeckoApi'
import { setAllCoins, selectAllCoins, setCurrentCoin, modalWindowToogle } from '../../store/slice'

export default function SwapModalContent() {
    const [getCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    const dispatch = useDispatch()

    const coins = useSelector(selectAllCoins)

    useEffect(() => {
        async function fetchCoins() {
            try {
                const { data } = await getCoins({})

                if (data) {
                    dispatch(setAllCoins(data))
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchCoins()
    }, [dispatch, getCoins])

    const applyCoin = (id) => {
        const currentCoin = coins.find((coin) => coin.id === id)
        console.log(currentCoin)

        if (currentCoin) {
            dispatch(setCurrentCoin(currentCoin))
            dispatch(modalWindowToogle(false))
        }
    }

    if (isFetching) {
        return <Loader />
    }

    return (
        <>
            <p className='font-dm font-medium text-[18px] text-[#131313] mb-[24px] pl-[8px]'>
                Select a token
            </p>
            <ul>
                {coins.map((coin: ICoinInfo) => (
                    <li key={coin.id} className='py-[2px]'>
                        <button
                            className='w-full flex gap-4 items-center transition duration-300 ease-in-out hover:bg-[#d4d9e1] p-[8px] rounded-[16px]'
                            onClick={() => applyCoin(coin.id)}
                        >
                            <img
                                src={coin.image}
                                alt={`${coin.name} image`}
                                className='w-[44px] h-[44px]'
                            />
                            <div>
                                <p className='font-dm font-medium text-[#131313] text-[18px]'>
                                    {coin.name}
                                </p>
                                <p className='font-dm font-medium text-[#131313A1] text-[14px] text-left'>
                                    {coin.symbol.toUpperCase()}
                                </p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

