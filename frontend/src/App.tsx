import { Outlet } from 'react-router-dom';
import React from 'react';
import { cn } from './utils/util.ts';
import Sidebar from './components/sidebar/Sidebar.tsx';

const App: React.FC = () => {
    return (
        <div className={cn('flex h-dvh basis-full overflow-hidden')}>
            <Sidebar />
            <main className={cn('w-full overflow-y-auto bg-neutral-900')}>
                <Outlet />
            </main>
        </div>
    );
};

export default App;
