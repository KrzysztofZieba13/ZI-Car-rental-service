import { createContext, useContext, useState, type ReactNode } from 'react';
interface AppContextType {
    notification: NotificationType | null;
    setNotification: (message: NotificationType | null) => void;
}

interface NotificationType {
    message: string;
    status: 'success' | 'error';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<NotificationType | null>(
        null,
    );

    return (
        <AppContext.Provider value={{ notification, setNotification }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
