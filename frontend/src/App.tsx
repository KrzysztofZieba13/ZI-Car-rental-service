import { Outlet } from 'react-router-dom';
import React from 'react';
import { cn } from './utils/util.ts';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Notification from './features/notifications/Notification.tsx';
import { useApp } from './context/AppContext.tsx';

const App: React.FC = () => {
    const { notification } = useApp();
    return (
        <div className={cn('relative flex h-dvh basis-full overflow-hidden')}>
            {notification && (
                <Notification status={notification.status}>
                    {notification.message}
                </Notification>
            )}
            <Sidebar />
            <main className={cn('w-full overflow-y-auto bg-neutral-900')}>
                <Outlet />
            </main>
        </div>
    );
};

export default App;
