import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DropDownIcon from '../../icons/DropDownIcon'
import { modalWindowToogle, setTokenButtonId } from '../../store/slice'
import { useLazyGetCurrentCoinQuery } from '../../api/coinGeckoApi'
import Loader from '../Loader'
import clsx from 'clsx'

export default function SelectTokenButton({ currentCoin, buttonId, className }) {
    const [fetchCurrentCoin, { isFetching }] = useLazyGetCurrentCoinQuery()

    const dispatch = useDispatch()

    const fetchCoinsOpen = async () => {
        dispatch(setTokenButtonId(buttonId))
        dispatch(modalWindowToogle(true))
    }

    useEffect(() => {
        async function getBitcoin() {
            if (buttonId === 1) {
                await fetchCurrentCoin('bitcoin')
            }
        }

        getBitcoin()
    }, [buttonId, fetchCurrentCoin])

    if (isFetching) {
        return <Loader />
    }

    return (
        <button
            className={`text-[14px] leading-[18px] font-medium font-dm flex items-center gap-[8px] ${
                currentCoin
                    ? clsx(
                          'bg-white border border-[#f2f2f2] shadow-[0_0_10px_#1313130a]',
                          className
                      )
                    : clsx('text-white bg-linear-to-t from-[#F43F5E] to-[#FDA4AF]', className)
            }`}
            id={buttonId}
            onClick={fetchCoinsOpen}
        >
            {currentCoin ? (
                <>
                    <img src={currentCoin.image.thumb} alt={`${currentCoin.name} image`} />
                    <span className='font-dm font-medium text-[#131313] text-[16px] text-left'>
                        {currentCoin.symbol.toUpperCase()}
                    </span>

                    <DropDownIcon width={24} height={24} color={'#131313A1'} />
                </>
            ) : (
                <>
                    <span>Select a token</span>
                    <DropDownIcon width={24} height={24} color={'white'} />
                </>
            )}
        </button>
    )
}

