import { useId, useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
// import { useDebounce } from 'use-debounce'
import numeral from 'numeral';
// import DefaultAmountButton from '../DefaultAmountButton'
import Layout from '../Layout';
import SelectTokenButton from '../SelectTokenButton';
import ConnectButton from '../ConnectButton';
import SwitchIcon from '../../icons/SwitchIcon';
import { selectAddress, selectSellCoin } from '../../store/slice';
import type { IBuySellLayout } from '../../interfaces/IBuySellLayout/IBuySellLayout';

export default function BuySellLayout({ pageLabel, data }: IBuySellLayout) {
    const [amount, setAmount] = useState('');
    // const [coinPrice, setCoinPrice] = useState(0)

    const [swithed, setSwitched] = useState(false);

    // const [debouncedAmount] = useDebounce(amount, 1000)

    const id = useId();

    const address = useSelector(selectAddress);
    // const allCoins = useSelector(selectAllCoins)
    const coin = useSelector(selectSellCoin);

    // useEffect(() => {
    //     if (coin) {
    //         const {
    //             market_data: {
    //                 current_price: { usd }
    //             }
    //         } = coin

    //         setCoinPrice(usd)
    //     }
    // }, [allCoins.length, coin])

    // const calculatePrice = (value: string, coinPrice: number) => {
    //     if (coin) {
    //         const num = value.slice(1)

    //         if (value[0] === '$') {
    //             return `${(+num / coinPrice).toFixed(4)} ${coin.id}`.toUpperCase()
    //         }
    //     }
    // }

    const handleSwitch = () => {
        setSwitched(!swithed);
        console.log(swithed);
    };

    return (
        <div className='w-full flex flex-col items-center gap-2'>
            <Layout>
                <div>
                    <div className='mb-6 flex justify-between items-center'>
                        <label
                            htmlFor={id}
                            className='font-dm font-[485] text-[14px] leading-[18px] text-[#131313A1]'
                        >
                            {pageLabel}
                        </label>
                        <button>COUNTRY</button>
                    </div>
                    <div className='flex items-center justify-center gap-1 mb-5'>
                        <input
                            id={id}
                            value={amount}
                            type='text'
                            placeholder='$0'
                            className='w-full text-[#131313] leading-[60px] font-medium font-dm text-[70px] outline-none'
                            onChange={(e: ChangeEvent) =>
                                setAmount(
                                    numeral(
                                        (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '')
                                    ).format('$0')
                                )
                            }
                        />
                    </div>
                    {!amount || amount === '$0' ? (
                        <ul className='flex justify-center items-center gap-2 mb-6'>
                            {data.map((item) => (
                                <li key={item.id}>
                                    {/* <DefaultAmountButton
                                        disabled={disabled}
                                        handleClick={(e: MouseEvent) =>
                                            setAmount((e.target as HTMLButtonElement).textContent)
                                        }
                                    >
                                        {item.content}
                                    </DefaultAmountButton> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='flex justify-center gap-1.5 items-center'>
                            <p className='font-dm font-[485] leading-[22px] text-center text-[#131313a1] text-[16px]'>
                                {/* {calculatePrice(debouncedAmount, coinPrice)} */}
                            </p>
                            <button onClick={handleSwitch}>
                                <SwitchIcon />
                            </button>
                        </div>
                    )}
                </div>
            </Layout>
            <SelectTokenButton
                buttonId={'1'}
                currentCoin={coin}
                className='w-1/4 p-4 rounded-2xl'
            />
            <ConnectButton
                className='w-1/4 py-4 bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-6 cursor-pointer transition-colors ease-in-out duration-300 hover:bg-[#cd7ee7] hover:text-[#000080]'
                disabled={!address || !amount ? true : false}
            >
                {!address ? (
                    <span>Connect a wallet</span>
                ) : !amount ? (
                    <span>Enter an amount</span>
                ) : (
                    <span>Continue</span>
                )}
            </ConnectButton>
        </div>
    );
}
