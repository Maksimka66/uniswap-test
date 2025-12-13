import { useEffect, useId, useState, type ChangeEvent, type MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import numeral from 'numeral'
import DefaultAmountButton from '../DefaultAmountButton'
import Layout from '../Layout'
import SelectTokenButton from '../SelectTokenButton'
import ConnectButton from '../ConnectButton'
import SwitchIcon from '../../icons/SwitchIcon'
import { selectAddress, selectFirstCoin } from '../../store/slice'

export default function BuySellLayout({ pageLabel, data, disabled }) {
    const [amount, setAmount] = useState('')
    const [coinPrice, setCoinPrice] = useState(0)

    const [debouncedAmount] = useDebounce(amount, 1000)

    const id = useId()

    const address = useSelector(selectAddress)
    const coin = useSelector(selectFirstCoin)

    useEffect(() => {
        if (coin) {
            const {
                market_data: {
                    current_price: { usd }
                }
            } = coin

            setCoinPrice(usd)
        }
    }, [coin])

    const calculatePrice = (value: string, coinPrice: number) => {
        if (coin) {
            const num = value.slice(1)

            if (value[0] === '$') {
                return `${(+num / coinPrice).toFixed(4)} ${coin.id}`.toUpperCase()
            }
        }
    }

    // const handleSwitch = () => {
    //     setAmount(parseFloat(calculatePrice(debouncedAmount, coinPrice)))
    //     setCoinPrice(coinPrice)
    // }

    return (
        <div className='w-full flex flex-col items-center gap-[8px]'>
            <Layout>
                <div>
                    <div className='mb-[24px] flex justify-between items-center'>
                        <label
                            htmlFor={id}
                            className='font-dm font-[485] text-[14px] leading-[18px] text-[#131313A1]'
                        >
                            {pageLabel}
                        </label>
                        <button>COUNTRY</button>
                    </div>
                    <div className='flex items-center justify-center gap-[4px] mb-[20px]'>
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
                        <ul className='flex justify-center items-center gap-[8px]'>
                            {data.map((item) => (
                                <li key={item.id}>
                                    <DefaultAmountButton
                                        disabled={disabled}
                                        handleClick={(e: MouseEvent) =>
                                            setAmount(
                                                `${(e.target as HTMLButtonElement).textContent}`
                                            )
                                        }
                                    >
                                        {item.content}
                                    </DefaultAmountButton>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='flex justify-center gap-[6px] items-center'>
                            <p className='font-dm font-[485] leading-[22px] text-center text-[#131313a1] text-[16px]'>
                                {calculatePrice(debouncedAmount, coinPrice)}
                            </p>
                            {/* <button onClick={handleSwitch}>
                                <SwitchIcon />
                            </button> */}
                        </div>
                    )}
                </div>
            </Layout>
            <SelectTokenButton
                buttonId={1}
                currentCoin={coin}
                className='w-1/4 p-[16px] rounded-[16px]'
            />
            <ConnectButton
                className='w-1/4 py-[16px] bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-[24px]'
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
    )
}

