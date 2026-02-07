import type { IToken } from '../ITokens/ITokens'

export interface ISelectTokenButton {
    className: string
    buttonId: string
    currentCoin: IToken | null
}

