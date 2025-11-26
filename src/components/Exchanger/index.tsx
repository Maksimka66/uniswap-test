import { useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import InputWrapper from '../../shared/InputWrapper';
import Layout from '../../shared/Layout';
import DropDownIcon from '../../icons/DropDownIcon';

export default function Exchanger() {
    const [direction, setDirection] = useState('');
    const [fieldFrom, setFieldFrom] = useState('0.0');
    const [fieldTo, setFieldTo] = useState('0.0');

    const handleClick = () => {
        if (!direction) {
            setDirection('flex-col-reverse');
        } else {
            setDirection('');
        }
    };

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
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    placeholder={fieldFrom}
                    buttonClassname=''
                    buttonContent={<></>}
                />
                <button className='my-4' onClick={handleClick}>
                    <ArrowDownIcon />
                </button>
                <InputWrapper
                    label='To'
                    inputClassName='placeholder:text-[18px] leading-[24px]'
                    placeholder={fieldTo}
                    layoutClassName='items-end justify-between'
                    buttonClassname='flex justify-between rounded-[10px] items-center px-3 py-1.5 bg-linear-to-t from-[#F43F5E] to-[#FDA4AF]'
                    buttonContent={
                        <>
                            <span className='mr-[8px] text-[14px] text-white leading-[18px] font-medium font-dm'>
                                Select a token
                            </span>
                            <DropDownIcon />
                        </>
                    }
                />
            </div>
            <button className='w-full py-[16px] bg-[#FFF1F2] rounded-[10px] font-dm font-medium text-[#F43F5E] text-[18px] leading-[24px]'>
                Connect a wallet
            </button>
        </Layout>
    );
}
