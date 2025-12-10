import type { PropsWithChildren } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { modalWindowToogle, selectIsModalOpen } from '../../store/slice'
import CloseButton from '../CloseButton/CloseButton'

import './styles.css'

export default function ModalWindow({ children }: PropsWithChildren) {
    const dispatch = useDispatch()

    const openModal = useSelector(selectIsModalOpen)

    const closeWindow = () => {
        dispatch(modalWindowToogle(false))
    }

    return (
        <Modal
            isOpen={openModal}
            overlayClassName='modal-overlay'
            className='modal-content'
            closeTimeoutMS={300}
            ariaHideApp={false}
            onRequestClose={closeWindow}
        >
            <CloseButton />
            {children}
        </Modal>
    )
}

