import { useId } from 'react'
import clsx from 'clsx'
import type { IInputWrapperProps } from '../../interfaces/IInputWrapper/IInputWrapper'

export default function InputWrapper({
    handleChange,
    children,
    label,
    placeholder,
    layoutClassName,
    inputClassName,
    value,
    debouncedValue
}: IInputWrapperProps) {
    const id = useId()

    return (
        <div
            className={clsx(
                'flex items-center justify-between p-4 bg-layout-bg rounded-[12px] w-full border border-frame-color',
                layoutClassName
            )}
        >
            <div className='flex flex-col'>
                <label
                    className='font-medium font-dm text-left leading-[18px] text-[14px] text-label mb-2'
                    htmlFor={id}
                >
                    {label}
                </label>
                <input
                    className={clsx(
                        'mb-[4px] py-[8px] focus:outline-none placeholder:font-bold placeholder:font-dm placeholder:text-placeholder',
                        inputClassName
                    )}
                    type='text'
                    inputMode='numeric'
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                <span className='font-dm font-medium text-[14px] leading-[18px] text-main-text'>
                    {debouncedValue}
                </span>
            </div>
            {children}
        </div>
    )
}

