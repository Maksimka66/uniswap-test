import type { ChangeEventHandler, ReactNode } from 'react'

export interface IInputWrapperProps {
    children: ReactNode
    handleChange: ChangeEventHandler
    label: string
    placeholder: string
    layoutClassName?: string
    inputClassName: string
    value: string
    debouncedValue: string
}

