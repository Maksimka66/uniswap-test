import { useDispatch, useSelector } from 'react-redux'
import CherryIcon from '../../icons/CherryIcon'
import MoreMenuIcon from '../../icons/MoreMenuIcon'
import { navRoutes } from '../../routes/routes'
import ConnectButton from '../../shared/ConnectButton'
import Navigation from '../Navigation'
import { removeKey, selectKey } from '../../store/slice'

export default function Header() {
    const dispatch = useDispatch()
    const key = useSelector(selectKey)

    const handleClick = () => {
        dispatch(removeKey())
    }

    return (
        <header className='py-[22px] px-[44px] flex justify-between items-center border-b border-[#F3F4F6]'>
            <div className='flex items-center gap-2'>
                <CherryIcon />
                <h1 className='text-[16px] leading-[18px] text-transparent bg-clip-text bg-gradient-to-l from-[#F43F5E] to-[#FDA4AF] font-main font-normal'>
                    CherrySwap
                </h1>
            </div>
            <Navigation links={navRoutes} />
            <div className='flex items-center gap-2'>
                {key ? (
                    <button
                        className='py-[8px] px-[20px] bg-linear-to-t from-[#F43F5E] to-[#FDA4AF] text-[16px] text-white leading-[20px] rounded-[10px] font-medium font-dm'
                        onClick={handleClick}
                    >
                        Disconnect
                    </button>
                ) : (
                    <ConnectButton className='py-[8px] px-[20px] bg-linear-to-t from-[#F43F5E] to-[#FDA4AF] text-[16px] text-white leading-[20px]'>
                        Connect
                    </ConnectButton>
                )}
                <button className='py-[16px] px-[16px] rounded-[10px] bg-[#F3F4F6]'>
                    <MoreMenuIcon />
                </button>
            </div>
        </header>
    )
}

