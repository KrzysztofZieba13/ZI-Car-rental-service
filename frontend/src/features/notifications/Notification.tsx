import { cn } from '../../utils/util.ts';
import Button from '../../components/buttons/Button.tsx';
import React from 'react';
import { useApp } from '../../context/AppContext.tsx';

interface NotificationProps {
    status: 'success' | 'error';
    children: React.ReactNode;
}

const Notification = ({ status, children }: NotificationProps) => {
    const { handleNotification } = useApp();
    return (
        <div
            className={cn(
                'fixed right-5 bottom-5 z-200 w-90 rounded bg-stone-950 p-4 pb-8 text-white',
                status === 'success' && 'border-2 border-emerald-900',
                status === 'error' && 'border-2 border-red-900',
            )}
        >
            <Button
                type="button"
                variant="transparent"
                onClick={() => handleNotification(null)}
                className="absolute right-2 bottom-0 text-sm text-stone-400"
            >
                Hide
            </Button>
            {children}
        </div>
    );
};

export default Notification;
