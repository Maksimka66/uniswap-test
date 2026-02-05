import { useDispatch } from 'react-redux'
import CloseIcon from '../../icons/CloseIcon'
import { modalWindowToogle } from '../../store/slice'

export default function CloseButton() {
    const dispatch = useDispatch()

    return (
        <button
            className={'sticky top-0 right-0 bg-transparent w-[24px] h-[24px]'}
            onClick={() => dispatch(modalWindowToogle(false))}
        >
            <CloseIcon />
        </button>
    )
}

