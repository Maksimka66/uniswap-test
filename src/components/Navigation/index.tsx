import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import type { ILinks, INav } from '../../interfaces/INav/INav';

export default function Navigation({ links }: INav) {
    return (
        <ul className='flex gap-4'>
            {links.map((link: ILinks) => (
                <li key={link.id}>
                    <NavLink
                        to={link.to}
                        className={clsx(
                            'font-dm font-medium text-[16px] leading-[20px] text-description-text'
                        )}
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

