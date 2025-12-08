import type { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '../../icons/CloseIcon'
import { modalWindowToogle } from '../../store/slice'

export default function ModalWindow({ children }: PropsWithChildren) {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(modalWindowToogle(false))
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full z-99 bg-[#000000BF] overflow-hidden overflow-y-auto transition-opacity duration-[0.3s]'>
            <div className='absolute top-0 left-0 flex justify-center items-center w-full min-h-full'>
                <div className='relative w-full max-w-[400px] max-h-[460px] overflow-y-auto rounded-[20px] bg-white p-[16px] transition-opacity duration-[0.3s] transition-transform transform-[translate-y-[-50px]]'>
                    <button
                        className='sticky top-[16px] right-[16px] bg-transparent w-[24px] h-[24px]'
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    )
}

