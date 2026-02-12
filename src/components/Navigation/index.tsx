import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import type { ILinks, INav } from '../../interfaces/INav/INav';

export default function Navigation({ links }: INav) {
    const { pathname } = useLocation();

    return (
        <nav className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <ul className='flex gap-4'>
                {links.map((link: ILinks) => (
                    <li key={link.id} className='rounded-full bg-[#dfe4df] px-5 py-2'>
                        <NavLink
                            to={link.to}
                            className={clsx(
                                'font-dm font-medium text-[16px] leading-5',
                                pathname === link.to
                                    ? 'py-px text-current-link border-b-2 border-[#4aeb45]'
                                    : 'text-description-text'
                            )}
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
