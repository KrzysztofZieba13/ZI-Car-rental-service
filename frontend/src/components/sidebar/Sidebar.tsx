import { cn } from '../../utils/util.ts';
import Logo from '../logo/Logo.tsx';
import carziLogoWhite from '@logo/car-zi-white.png';
import SidebarLink from './SidebarLink.tsx';
import Button from '../buttons/Button.tsx';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/16/solid';
import { logout } from '../../services/authService.ts';
import { useLoaderData, useNavigate } from 'react-router';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useLoaderData();
    const isAdmin = user.role === 'admin';
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <aside className={cn('flex w-1/6 shrink-0 flex-col bg-stone-950')}>
            <div className={cn('mt-4 flex justify-center')}>
                <Logo path={carziLogoWhite} alt="Carzi company logo" />
            </div>
            <nav className="flex h-full flex-col items-center justify-between">
                <ul className={cn('flex w-full flex-col justify-center')}>
                    <SidebarLink path={`${isAdmin ? '/admin/car' : '/cars'}`}>
                        {isAdmin ? 'Add Car' : 'Search Cars'}
                    </SidebarLink>
                    <SidebarLink
                        path={`${isAdmin ? '/admin/cars' : '/rentals'}`}
                    >
                        {isAdmin ? 'Manage Cars' : 'My Rentals'}
                    </SidebarLink>
                </ul>
                <Button
                    type="button"
                    variant="transparent"
                    className="flex items-center gap-1 hover:text-stone-500"
                    onClick={handleLogout}
                >
                    <ArrowLeftEndOnRectangleIcon className="size-5" />
                    Logout
                </Button>
            </nav>
        </aside>
    );
};

export default Sidebar;
