import type { ChangeEventHandler } from 'react'

export interface IInputWrapperProps {
    label: string
    placeholder: string
    layoutClassName?: string
    inputClassName: string
    value: string
    debouncedValue: string
    handleChange: ChangeEventHandler
}

