interface IButtonContent {
    id: number
    content: string
}

export interface IBuySellLayout {
    data: IButtonContent[]
    pageLabel: string
    disabled?: boolean
}

