import { navRoutes } from '../../routes/routes'
import Navigation from '../Navigation'

export default function Header() {
    return (
        <header className='py-[22px] px-[44px] flex justify-between'>
            <div></div>
            <Navigation links={navRoutes} />
            <div></div>
        </header>
    )
}

