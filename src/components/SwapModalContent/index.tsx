import { useDispatch, useSelector } from 'react-redux'
import type { ICoinInfo } from '../../interfaces/ICoinInfo/ICoinInfo'
import { selectAllCoins, modalWindowToogle } from '../../store/slice'
import { useLazyGetCurrentCoinQuery } from '../../api/coinGeckoApi'
import Loader from '../../shared/Loader'

export default function SwapModalContent() {
    const [fetchCurrentCoin, { isFetching }] = useLazyGetCurrentCoinQuery()

    const dispatch = useDispatch()

    const coins = useSelector(selectAllCoins)

    const applyCoin = async (id: string) => {
        const { data } = await fetchCurrentCoin(id)

        if (data) {
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
                                <p className='font-dm font-medium text-[#131313] text-[18px] text-left'>
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

