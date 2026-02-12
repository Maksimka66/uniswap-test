import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import numeral from 'numeral';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import InputWrapper from '../../shared/InputWrapper';
import Layout from '../../shared/Layout';
import ConnectButton from '../../shared/ConnectButton';
import SelectTokenButton from '../../shared/SelectTokenButton';
import Loader from '../../shared/Loader';
import {
    loaderToogle,
    selectAddress,
    selectButtonId,
    selectBuyCoin,
    selectLoader,
    selectSellCoin,
    setButtonId,
    setCurrentCoin
} from '../../store/slice';
import { getMarketData } from '../../api/coinGeckoApi';
import { swapTokens } from '../../api/uniswapTrader';

export default function Exchanger() {
    const [fieldSell, setFieldSell] = useState('');
    const [fieldBuy, setFieldBuy] = useState('');
    const [tokenSellPrice, setTokenSellPrice] = useState(0);
    const [tokenBuyPrice, setTokenBuyPrice] = useState(0);

    const [fieldSellValue] = useDebounce(fieldSell, 1000);
    const [fieldBuyValue] = useDebounce(fieldBuy, 1000);

    const dispatch = useDispatch();

    const address = useSelector(selectAddress);
    const buttonId = useSelector(selectButtonId);
    const tokenSell = useSelector(selectSellCoin);
    const tokenBuy = useSelector(selectBuyCoin);
    const loader = useSelector(selectLoader);

    useEffect(() => {
        if (tokenSell) {
            const getTokenSellPrice = async () => {
                try {
                    dispatch(loaderToogle(true));

                    const address = tokenSell.address.toLowerCase();

                    const res = await getMarketData(address);

                    if (res) {
                        setTokenSellPrice(res[address].usd);
                    }
                } catch (e) {
                    if (e instanceof Error) {
                        console.log(e.message);
                    }
                } finally {
                    dispatch(loaderToogle(false));
                }
            };

            getTokenSellPrice();
        }
    }, [dispatch, tokenSell]);

    useEffect(() => {
        if (tokenBuy) {
            const getTokenBuyPrice = async () => {
                try {
                    dispatch(loaderToogle(true));

                    const address = tokenBuy.address.toLowerCase();

                    const res = await getMarketData(address);

                    if (res) {
                        setTokenBuyPrice(res[address].usd);
                    }
                } catch (e) {
                    if (e instanceof Error) {
                        console.log(e.message);
                    }
                } finally {
                    dispatch(loaderToogle(false));
                }
            };

            getTokenBuyPrice();
        }
    }, [dispatch, tokenBuy]);

    function calculatePrice(value: string, coin: number) {
        if (coin) {
            return numeral(+value * coin)
                .format('($0.00a)')
                .toUpperCase();
        } else {
            return numeral(0).format('($0.00a)');
        }
    }

    function toogleStates() {
        if (buttonId === 'sell') {
            const previousCoin = tokenSell;
            const previousFieldValue = fieldSell;

            dispatch(setCurrentCoin(tokenBuy));
            dispatch(setButtonId('buy'));
            dispatch(setCurrentCoin(previousCoin));

            setFieldBuy(previousFieldValue);
            setFieldSell(fieldBuy);
        }

        if (buttonId === 'buy') {
            const previousCoin = tokenBuy;
            const previousFieldValue = fieldBuy;

            dispatch(setCurrentCoin(tokenSell));
            dispatch(setButtonId('sell'));
            dispatch(setCurrentCoin(previousCoin));

            setFieldSell(previousFieldValue);
            setFieldBuy(fieldSell);
        }
    }

    const handleChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
            .trim()
            .replace(/[^\d.,]/g, '')
            .replace(/([.,])(.*)\1/g, '$1$2')
            .replace(/^0+(?=\d)/, '')
            .replace(/^[.,]/, '');

        if (e.target.id === 'sell') {
            setFieldSell(value);

            if (tokenBuyPrice) {
                const calculatedToken = ((+value * +tokenSellPrice) / +tokenBuyPrice).toFixed(3);

                if (+calculatedToken) {
                    setFieldBuy(calculatedToken);
                } else {
                    setFieldBuy('');
                }
            }
        }

        if (e.target.id === 'buy') {
            setFieldBuy(value);

            if (tokenSellPrice) {
                const calculatedToken = ((+value * +tokenBuyPrice) / +tokenSellPrice).toFixed(3);

                if (+calculatedToken) {
                    setFieldSell(calculatedToken);
                } else {
                    setFieldSell('');
                }
            }
        }
    };

    const swap = async () => {
        try {
            if (tokenSell && tokenBuy && fieldSell) {
                dispatch(loaderToogle(true));

                const res = await swapTokens(fieldSell, tokenSell, tokenBuy);

                console.log(res);
            }
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        } finally {
            dispatch(loaderToogle(false));
        }
    };

    if (loader) {
        return <Loader />;
    }

    return (
        <Layout>
            <div className='flex justify-between mb-2'>
                <p className='font-dm font-medium text-[20px] leading-[26px] text-main-text'>
                    Swap
                </p>
                <button className='cursor-pointer ease-in-out duration-300 transition-transform hover:rotate-90'>
                    <SettingsIcon />
                </button>
            </div>
            <p className='mb-10 text-left font-dm font-medium text-[14px] leading-[18px] text-description-text'>
                Easy way to trade your tokens
            </p>
            <div className={'flex flex-col items-center mb-6'}>
                <InputWrapper
                    id={'sell'}
                    label='Sell'
                    value={fieldSell}
                    debouncedValue={calculatePrice(fieldSellValue, tokenSellPrice)}
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    placeholder='0.0'
                    handleChange={handleChange}
                    disabled={!tokenSell ? true : false}
                >
                    <SelectTokenButton
                        currentCoin={tokenSell}
                        className='px-3 py-1.5 rounded-[98px]'
                        buttonId={'sell'}
                    />
                </InputWrapper>

                <button className='my-4' onClick={toogleStates}>
                    <ArrowDownIcon />
                </button>
                <InputWrapper
                    id={'buy'}
                    label='Buy'
                    value={fieldBuy}
                    debouncedValue={calculatePrice(fieldBuyValue, tokenBuyPrice)}
                    placeholder='0.0'
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    handleChange={handleChange}
                    disabled={!tokenBuy ? true : false}
                >
                    <SelectTokenButton
                        currentCoin={tokenBuy}
                        className='px-3 py-1.5 rounded-[98px]'
                        buttonId={'buy'}
                    />
                </InputWrapper>
            </div>
            {address ? (
                <button
                    className='cursor-pointer rounded-[10px] font-medium font-dm w-full py-4 bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-6 transition-colors ease-in-out duration-300 hover:bg-[#e8c6f5] hover:text-[#ff37c7]'
                    onClick={swap}
                >
                    Swap tokens
                </button>
            ) : (
                <ConnectButton className='w-full py-4 bg-[#FFF1F2] text-[#F43F5E] text-[18px] leading-6 cursor-pointer transition-colors ease-in-out duration-300 hover:bg-[#e8c6f5] hover:text-[#ff37c7]'>
                    Connect a wallet
                </ConnectButton>
            )}
        </Layout>
    );
}
