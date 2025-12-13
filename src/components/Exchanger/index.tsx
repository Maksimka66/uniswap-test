import { useEffect, useState, type ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import numeral from 'numeral'
import clsx from 'clsx'
import ArrowDownIcon from '../../icons/ArrowDownIcon'
import SettingsIcon from '../../icons/SettingsIcon'
import InputWrapper from '../../shared/InputWrapper'
import Layout from '../../shared/Layout'
import ConnectButton from '../../shared/ConnectButton'
import { selectAddress, selectFirstCoin, selectSecondCoin } from '../../store/slice'
import SelectTokenButton from '../../shared/SelectTokenButton'

export default function Exchanger() {
    const [direction, setDirection] = useState('')
    const [fieldFrom, setFieldFrom] = useState('')
    const [fieldTo, setFieldTo] = useState('')
    const [firstPrice, setFirstPrice] = useState(0)
    const [secondPrice, setSecondPrice] = useState(0)

    const [fieldFromValue] = useDebounce(fieldFrom, 1000)
    const [fieldToValue] = useDebounce(fieldTo, 1000)

    const address = useSelector(selectAddress)
    const firstCoin = useSelector(selectFirstCoin)
    const secondCoin = useSelector(selectSecondCoin)

    useEffect(() => {
        if (firstCoin) {
            const {
                market_data: {
                    current_price: { usd }
                }
            } = firstCoin

            setFirstPrice(usd)
        }

        if (secondCoin) {
            const {
                market_data: {
                    current_price: { usd }
                }
            } = secondCoin

            setSecondPrice(usd)
        }
    }, [firstCoin, secondCoin])

    const calculatePrice = (value: string, coin: number) => {
        if (coin) {
            return numeral(+value * coin)
                .format('($0.00a)')
                .toUpperCase()
        } else {
            return numeral(0).format('($0.00a)')
        }
    }

    const toggleDirection = () => {
        if (!direction) {
            setDirection('flex-col-reverse')
        } else {
            setDirection('')
        }
    }

    return (
        <Layout>
            <div className='flex justify-between mb-2'>
                <p className='font-dm font-medium text-[20px] leading-[26px] text-main-text'>
                    Swap
                </p>
                <button>
                    <SettingsIcon />
                </button>
            </div>
            <p className='mb-10 text-left font-dm font-medium text-[14px] leading-[18px] text-description-text'>
                Easy way to trade your tokens
            </p>
            <div className={clsx('flex flex-col items-center mb-6', direction)}>
                <InputWrapper
                    label='From'
                    value={fieldFrom}
                    debouncedValue={calculatePrice(fieldFromValue, firstPrice)}
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    placeholder='0.0'
                    handleChange={(e: ChangeEvent) =>
                        setFieldFrom((e.target as HTMLInputElement).value.replace(/[^0-9]/g, ''))
                    }
                >
                    <SelectTokenButton
                        currentCoin={firstCoin}
                        buttonId={1}
                        className='px-3 py-1.5 rounded-[98px]'
                    />
                </InputWrapper>

                <button className='my-4' onClick={toggleDirection}>
                    <ArrowDownIcon />
                </button>
                <InputWrapper
                    label='To'
                    value={fieldTo}
                    debouncedValue={calculatePrice(fieldToValue, secondPrice)}
                    placeholder='0.0'
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    handleChange={(e: ChangeEvent) =>
                        setFieldTo((e.target as HTMLInputElement).value.replace(/[^0-9]/g, ''))
                    }
                >
                    <SelectTokenButton
                        currentCoin={secondCoin}
                        buttonId={2}
                        className='px-3 py-1.5 rounded-[98px]'
                    />
                </InputWrapper>
            </div>
            {address ? (
                <button className='rounded-[10px] font-medium font-dm w-full py-[16px] bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-[24px]'>
                    Add funds to swap
                </button>
            ) : (
                <ConnectButton className='w-full py-[16px] bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-[24px]'>
                    Connect a wallet
                </ConnectButton>
            )}
        </Layout>
    )
}

