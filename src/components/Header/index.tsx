import { useDispatch, useSelector } from 'react-redux';
import CherryIcon from '../../icons/CherryIcon';
import MoreMenuIcon from '../../icons/MoreMenuIcon';
import { navRoutes } from '../../routes/routes';
import ConnectButton from '../../shared/ConnectButton';
import Navigation from '../Navigation';
import { removeKey, selectAddress } from '../../store/slice';

export default function Header() {
    const dispatch = useDispatch();

    const address = useSelector(selectAddress);

    const handleClick = () => {
        dispatch(removeKey());
    };

    return (
        <header className='py-[22px] px-11 flex justify-between items-center border-b border-[#F3F4F6] relative'>
            <div className='flex items-center gap-2'>
                <CherryIcon />
                <h1 className='text-[16px] leading-[18px] text-transparent bg-clip-text bg-linear-to-l from-[#F43F5E] to-[#FDA4AF] font-main font-normal'>
                    CherrySwap
                </h1>
            </div>
            <Navigation links={navRoutes} />
            <div className='flex items-center gap-2'>
                {address ? (
                    <>
                        <div>
                            <span className='text-[16px] text-[#000000] leading-5 font-medium font-dm'>
                                {address.substring(0, 6)}
                            </span>
                            <span className='text-[16px] text-[#000000] leading-5 font-medium font-dm tracking-wide'>
                                ...
                            </span>
                            <span className='text-[16px] text-[#000000] leading-5 font-medium font-dm'>
                                {address.substring(38)}
                            </span>
                        </div>
                        <button
                            className='py-2 px-5 bg-linear-to-t from-[#F43F5E] to-[#FDA4AF] text-[16px] text-white leading-5 rounded-[10px] font-medium font-dm cursor-pointer transition-colors ease-in-out duration-300 hover:bg-linear-to-t hover:from-[#8ae77e] hover:to-[#76c587] hover:text-[#F43F5E]'
                            onClick={handleClick}
                        >
                            Disconnect
                        </button>
                    </>
                ) : (
                    <ConnectButton className='py-2 px-5 bg-linear-to-t from-[#F43F5E] to-[#FDA4AF] text-[16px] text-white leading-5 cursor-pointer transition-colors ease-in-out duration-300 hover:bg-linear-to-b hover:from-[#ecd23f] hover:to-[#ec4863] hover:text-[#048000]'>
                        Connect
                    </ConnectButton>
                )}
                <button className='py-4 px-4 rounded-[10px] bg-[#F3F4F6]'>
                    <MoreMenuIcon />
                </button>
            </div>
        </header>
    );
}
