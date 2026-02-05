import clsx from 'clsx'
import type { IDefaultAmount } from '../../interfaces/IDefaultAmount/IDefaultAmount'

export default function DefaultAmountButton({
    children,
    disabled = false,
    handleClick
}: IDefaultAmount) {
    return (
        <button
            className={clsx(
                'px-[16px] py-[8px] bg-white rounded-[98px] border border-[#f2f2f2] font-dm font-[535] text-[16px] text-[#131313A1] leading-[18px]',
                !disabled ? 'hover:bg-[#1313131A]' : 'opacity-50 hover:cursor-not-allowed'
            )}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

