import { useDispatch } from 'react-redux';
import CloseIcon from '../../icons/CloseIcon';
import { modalWindowToogle } from '../../store/slice';

export default function CloseButton() {
    const dispatch = useDispatch();

    return (
        <button
            className={
                'cursor-pointer sticky top-0 right-0 bg-transparent w-6 h-6 ease-in-out duration-300 transition-transform hover:rotate-90'
            }
            onClick={() => dispatch(modalWindowToogle(false))}
        >
            <CloseIcon />
        </button>
    );
}
