import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import type { ILinks, INav } from '../../interfaces/INav/INav'

export default function Navigation({ links }: INav) {
    const { pathname } = useLocation()

    return (
        <nav className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <ul className='flex gap-4'>
                {links.map((link: ILinks) => (
                    <li key={link.id}>
                        <NavLink
                            to={link.to}
                            className={clsx(
                                'relative px-5 py-2 font-dm font-medium text-[16px] leading-5 rounded-full hover:bg-[#dfe4df] hover:text-[#302e2e] transition-colors ease-in-out duration-300',
                                pathname === link.to
                                    ? 'text-current-link bg-[#dfe4df]'
                                    : 'text-description-text'
                            )}
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
