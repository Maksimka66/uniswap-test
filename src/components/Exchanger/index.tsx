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
import { selectAddress } from '../../store/slice'
import type { ICoinInfo } from '../../interfaces/ICoinInfo/ICoinInfo'
import { useLazyGetAllCoinsQuery, useLazyGetCurrentCoinQuery } from '../../api/coinGeckoApi'
import Loader from '../../shared/Loader'

export default function Exchanger() {
    const [fetchCoins, { isLoading: loadAllCoins }] = useLazyGetAllCoinsQuery()
    const [fetchCurrentCoin, { isLoading: loadCurrentCoin }] = useLazyGetCurrentCoinQuery()

    const [direction, setDirection] = useState('')
    const [fieldFrom, setFieldFrom] = useState('')
    const [fieldTo, setFieldTo] = useState('')
    const [usd, setUsd] = useState(0)

    const [fieldFromValue] = useDebounce(fieldFrom, 1000)
    const [fieldToValue] = useDebounce(fieldTo, 1000)

    const address = useSelector(selectAddress)

    useEffect(() => {
        async function getCoins() {
            try {
                const { data } = await fetchCoins({})

                if (data) {
                    const { id } = data.find((item: ICoinInfo) => item.id === 'bitcoin')

                    const res = await fetchCurrentCoin(id)

                    if (res) {
                        setUsd(res.data.market_data.current_price.usd)
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }

        getCoins()
    }, [fetchCoins, fetchCurrentCoin, fieldFromValue, fieldToValue])

    const toggleDirection = () => {
        if (!direction) {
            setDirection('flex-col-reverse')
        } else {
            setDirection('')
        }
    }

    const calculatePrice = (value: string) =>
        numeral(+value * usd)
            .format('($0.00a)')
            .toUpperCase()

    if (loadAllCoins || loadCurrentCoin) {
        return <Loader />
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
                    debouncedValue={calculatePrice(fieldFromValue)}
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    placeholder='0.0'
                    handleChange={(e: ChangeEvent) =>
                        setFieldFrom((e.target as HTMLInputElement).value)
                    }
                />
                <button className='my-4' onClick={toggleDirection}>
                    <ArrowDownIcon />
                </button>
                <InputWrapper
                    label='To'
                    value={fieldTo}
                    debouncedValue={calculatePrice(fieldToValue)}
                    placeholder='0.0'
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    handleChange={(e: ChangeEvent) =>
                        setFieldTo((e.target as HTMLInputElement).value)
                    }
                />
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

