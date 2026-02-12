import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalWindowToogle, selectAllCoins, setCurrentCoin } from '../../store/slice';
import InputFilter from '../InputFilter';
import CloseButton from '../../shared/CloseButton/CloseButton';
import type { IToken } from '../../interfaces/ITokens/ITokens';
import PaginationButton from '../../shared/PaginationButton';

export default function SwapTokensModal() {
    const [tokens, setTokens] = useState<IToken[]>([]);

    const dispatch = useDispatch();

    const coins = useSelector(selectAllCoins);

    useEffect(() => {
        setTokens(coins.slice(0, 10));
    }, [coins]);

    const applyCoin = (address: string) => {
        const currentCoin = tokens.find((token: IToken) => address === token.address);

        if (currentCoin) {
            dispatch(setCurrentCoin(currentCoin));
            dispatch(modalWindowToogle(false));
        }
    };

    const getMoreTokens = () => {
        setTokens([...tokens, ...coins.slice(tokens.length, tokens.length + 10)]);
    };

    const handleFilter = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;

        if (value === ''.trim()) {
            setTokens(tokens);

            return;
        }

        const filteredCoins = coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(value.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(value.toLowerCase())
        );

        setTokens(filteredCoins);
    };

    return (
        <div className='relative'>
            <div className='pt-6 sticky top-0 right-0 bg-white'>
                <div className='mb-6 flex items-center justify-between'>
                    <span className='font-dm font-medium text-[18px] text-[#131313] pl-2'>
                        Select a token
                    </span>
                    <CloseButton />
                </div>
                <InputFilter handleFilter={handleFilter} />
            </div>
            {tokens.length ? (
                <>
                    <ul className='mb-4'>
                        {tokens.map((token: IToken, i) => (
                            <li key={i} className='py-0.5'>
                                <button
                                    className='w-full flex gap-4 items-center transition duration-300 ease-in-out hover:bg-[#d4d9e1] p-2 rounded-2xl cursor-pointer'
                                    onClick={() => applyCoin(token.address)}
                                >
                                    <img
                                        src={token.logoURI}
                                        alt={`${token.name} image`}
                                        className='w-11 h-11'
                                    />
                                    <div>
                                        <p className='font-dm font-medium text-[#131313] text-[18px] text-left'>
                                            {token.name}
                                        </p>
                                        <p className='font-dm font-medium text-[#131313A1] text-[14px] text-left'>
                                            {token.symbol.toUpperCase()}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <PaginationButton
                        isAble={tokens.length !== coins.length ? true : false}
                        onClick={getMoreTokens}
                    />
                </>
            ) : (
                <span className='font-dm text-[16px] text-red-600 pl-2'>
                    No coins with such name!
                </span>
            )}
        </div>
    );
}
