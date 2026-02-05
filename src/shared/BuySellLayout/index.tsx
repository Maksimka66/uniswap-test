import { useEffect, useId, useState, type ChangeEvent, type MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import numeral from 'numeral'
import DefaultAmountButton from '../DefaultAmountButton'
import Layout from '../Layout'
import SelectTokenButton from '../SelectTokenButton'
import ConnectButton from '../ConnectButton'
import SwitchIcon from '../../icons/SwitchIcon'
import { selectAddress, selectAllCoins, selectSellCoin } from '../../store/slice'
// import { useLazyGetAllCoinsQuery } from '../../api/coinGeckoApi'
import Loader from '../Loader'

export default function BuySellLayout({ pageLabel, data, disabled }) {
    const [amount, setAmount] = useState('')
    const [coinPrice, setCoinPrice] = useState(0)

    const [swithed, setSwitched] = useState(false)

    // const [fetchCoins, { isFetching }] = useLazyGetAllCoinsQuery()

    const [debouncedAmount] = useDebounce(amount, 1000)

    const id = useId()

    const address = useSelector(selectAddress)
    const allCoins = useSelector(selectAllCoins)
    const coin = useSelector(selectSellCoin)

    useEffect(() => {
        async function getCoins() {
            try {
                if (!allCoins.length) {
                    // await fetchCoins({})
                }
            } catch (e) {
                console.error(e)
            }
        }

        getCoins()

        if (coin) {
            const {
                market_data: {
                    current_price: { usd }
                }
            } = coin

            setCoinPrice(usd)
        }
    }, [allCoins.length, coin])

    const calculatePrice = (value: string, coinPrice: number) => {
        if (coin) {
            const num = value.slice(1)

            if (value[0] === '$') {
                return `${(+num / coinPrice).toFixed(4)} ${coin.id}`.toUpperCase()
            }
        }
    }

    const handleSwitch = () => {
        setSwitched(!swithed)
        console.log(swithed)
    }

    // if (isFetching) {
    //     return <Loader />
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
                        <ul className='flex justify-center items-center gap-[8px] mb-[24px]'>
                            {data.map((item) => (
                                <li key={item.id}>
                                    <DefaultAmountButton
                                        disabled={disabled}
                                        handleClick={(e: MouseEvent) =>
                                            setAmount((e.target as HTMLButtonElement).textContent)
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

