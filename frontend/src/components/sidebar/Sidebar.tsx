import { cn } from '../../utils/util.ts';
import Logo from '../logo/Logo.tsx';
import carziLogoWhite from '@logo/car-zi-white.png';
import SidebarLink from './SidebarLink.tsx';

const Sidebar = () => {
    return (
        <aside className={cn('w-1/6 shrink-0 bg-stone-950')}>
            <div className={cn('mt-4 flex justify-center')}>
                <Logo path={carziLogoWhite} alt="Carzi company logo" />
            </div>
            <nav>
                <ul className={cn('flex w-full flex-col justify-center')}>
                    <SidebarLink path="/admin/car">Add Car</SidebarLink>
                    <SidebarLink path="/admin/cars">Manage Cars</SidebarLink>
                    <SidebarLink path="/admin/employee">
                        Add Employee
                    </SidebarLink>
                    <SidebarLink path="/admin/employees">
                        Manage Employees
                    </SidebarLink>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
