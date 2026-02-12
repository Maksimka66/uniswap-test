import type { ISwapTokensModal } from '../../interfaces/ISwapTokensModal/ISwapTokensModal';

export default function PaginationButton({ isAble, onClick }: ISwapTokensModal) {
    return (
        isAble && (
            <button
                className='block w-1/2 mx-auto mb-6 px-1 py-2 rounded-full bg-[#310062] font-dm font-medium text-[#ffffff] cursor-pointer transition-colors ease-in-out duration-300 hover:bg-[#cd7ee7] hover:text-[#000080]'
                onClick={onClick}
            >
                More tokens
            </button>
        )
    );
}

