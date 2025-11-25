export interface ILinks {
    id: number;
    name: string;
    to: string;
}

export interface INav {
    links: ILinks[];
}
