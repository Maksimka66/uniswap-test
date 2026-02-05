import { type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '../../icons/SearchIcon'
import { selectAllCoins, setFilteredCoins } from '../../store/slice'

export default function InputFilter() {
    const dispatch = useDispatch()

    const coins = useSelector(selectAllCoins)

    const handleFilter = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value

        const filteredCoins = coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(value.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(value.toLowerCase())
        )

        dispatch(setFilteredCoins(filteredCoins))
    }

    return (
        <div className='mb-3 flex items-center gap-3 relative p-4 rounded-[999px] bg-[#f9f9f9]'>
            <SearchIcon />
            <input
                className='w-full placeholder:font-medium placeholder:font-dm placeholder:text-[#131313a1] placeholder:text-[18px] focus:outline-none'
                type='text'
                placeholder='Search tokens'
                onChange={handleFilter}
            />
        </div>
    )
}

