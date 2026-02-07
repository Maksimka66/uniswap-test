import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    modalWindowToogle,
    selectAllCoins,
    selectFilteredCoins,
    setCurrentCoin,
    setFilteredCoins
} from '../../store/slice'
import InputFilter from '../InputFilter'
import CloseButton from '../../shared/CloseButton/CloseButton'
import type { IToken } from '../../interfaces/ITokens/ITokens'

export default function SwapModalContent() {
    const coins = useSelector(selectAllCoins)
    const filteredCoins = useSelector(selectFilteredCoins)

    const dispatch = useDispatch()

    const applyCoin = (address: string) => {
        const currentCoin = coins.find((coin: IToken) => address === coin.address)

        if (currentCoin) {
            dispatch(setCurrentCoin(currentCoin))
            dispatch(modalWindowToogle(false))
        }
    }

    useEffect(() => {
        dispatch(setFilteredCoins(coins))
    }, [coins, dispatch])

    return (
        <div className='relative'>
            <div className='pt-6 sticky top-0 right-0 bg-white'>
                <div className='mb-6 flex items-center justify-between'>
                    <span className='font-dm font-medium text-[18px] text-[#131313] pl-2'>
                        Select a token
                    </span>
                    <CloseButton />
                </div>
                <InputFilter />
            </div>
            <ul>
                {filteredCoins.length ? (
                    filteredCoins.map((coin: IToken, i) => (
                        <li key={i} className='py-0.5'>
                            <button
                                className='w-full flex gap-4 items-center transition duration-300 ease-in-out hover:bg-[#d4d9e1] p-2 rounded-2xl'
                                onClick={() => applyCoin(coin.address)}
                            >
                                <img
                                    src={coin.logoURI}
                                    alt={`${coin.name} image`}
                                    className='w-11 h-11'
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
                    ))
                ) : (
                    <span className='font-dm text-[16px] text-red-600 pl-2'>
                        No coins with such name!
                    </span>
                )}
            </ul>
        </div>
    )
}

