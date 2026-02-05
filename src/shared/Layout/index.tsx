import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className='bg-white p-9 rounded-[28px] w-1/4 m-auto border border-[#13131314]'>
            {children}
        </div>
    )
}

