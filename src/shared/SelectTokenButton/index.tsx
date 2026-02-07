import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import DropDownIcon from '../../icons/DropDownIcon'
import { modalWindowToogle, setButtonId } from '../../store/slice'
import type { ISelectTokenButton } from '../../interfaces/ISelectTokenButton/ISelectTokenButton'
import type { MouseEventHandler } from 'react'

export default function SelectTokenButton({
    currentCoin,
    className,
    buttonId
}: ISelectTokenButton) {
    const dispatch = useDispatch()

    const fetchCoinsOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
        dispatch(setButtonId(e.currentTarget.id))
        dispatch(modalWindowToogle(true))
    }

    return (
        <button
            className={`text-[14px] leading-[18px] font-medium font-dm flex items-center gap-2 ${
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
                    <img
                        width={24}
                        height={24}
                        src={currentCoin.logoURI}
                        alt={`${currentCoin.name} image`}
                    />
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

