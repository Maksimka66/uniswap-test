import type { MouseEventHandler, ReactNode } from 'react'

export interface IDefaultAmount {
    children: ReactNode
    disabled: boolean
    handleClick: MouseEventHandler
}

