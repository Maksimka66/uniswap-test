import { useId } from 'react';
import clsx from 'clsx';
import type { IInputWrapperProps } from '../../interfaces/IInputWrapper/IInputWrapper';

export default function InputWrapper({
    label,
    placeholder,
    buttonContent,
    layoutClassName,
    inputClassName,
    buttonClassname
}: IInputWrapperProps) {
    const id = useId();

    return (
        <div
            className={clsx(
                'flex p-4 bg-layout-bg rounded-[12px] w-full border border-frame-color',
                layoutClassName
            )}
        >
            <div className='flex flex-col'>
                <label
                    className='font-medium font-dm text-left leading-[18px] text-[14px] text-label mb-4'
                    htmlFor={id}
                >
                    {label}
                </label>
                <input
                    className={clsx(
                        'placeholder:font-bold placeholder:font-dm placeholder:text-placeholder',
                        inputClassName
                    )}
                    id={id}
                    type='text'
                    placeholder={placeholder}
                />
            </div>
            <button className={buttonClassname}>{buttonContent}</button>
        </div>
    );
}

