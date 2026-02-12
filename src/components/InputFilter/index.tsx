import SearchIcon from '../../icons/SearchIcon';
import type { IInputFilter } from '../../interfaces/IInputFilter/IInputFilter';

export default function InputFilter({ handleFilter }: IInputFilter) {
    return (
        <div className='mb-3 flex items-center gap-3 relative p-4 rounded-full bg-[#f9f9f9]'>
            <SearchIcon />
            <input
                className='w-full placeholder:font-medium placeholder:font-dm placeholder:text-[#131313a1] placeholder:text-[18px] focus:outline-none'
                type='text'
                placeholder='Search tokens'
                onChange={handleFilter}
            />
        </div>
    );
}
