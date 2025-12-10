import { useDispatch, useSelector } from 'react-redux'
import DropDownIcon from '../../icons/DropDownIcon'
import { modalWindowToogle, selectCurrentCoin } from '../../store/slice'

export default function SelectTokenButton() {
    const dispatch = useDispatch()

    const currentCoin = useSelector(selectCurrentCoin)
console.log(currentCoin);

    const fetchCoinsOpen = () => {
        dispatch(modalWindowToogle(true))
    }

    return (
        <button
            className='text-[14px] text-white leading-[18px] font-medium font-dm flex gap-2 rounded-[10px] items-center px-3 py-1.5 bg-linear-to-t from-[#F43F5E] to-[#FDA4AF]'
            onClick={fetchCoinsOpen}
        >
            <span>Select a token</span>
            <DropDownIcon />
        </button>
    )
}

