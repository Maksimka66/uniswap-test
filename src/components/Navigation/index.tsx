import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import type { ILinks, INav } from '../../interfaces/INav/INav'

export default function Navigation({ links }: INav) {
    const { pathname } = useLocation()

    return (
        <ul className='flex gap-4 mx-auto'>
            {links.map((link: ILinks) => (
                <li key={link.id}>
                    <NavLink
                        to={link.to}
                        className={clsx(
                            'font-dm font-medium text-[16px] leading-[20px]',
                            pathname === link.to ? 'text-current-link' : 'text-description-text'
                        )}
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

