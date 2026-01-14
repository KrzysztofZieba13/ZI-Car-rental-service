import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
interface AppContextType {
    notification: NotificationType | null;
    handleNotification: (message: NotificationType | null) => void;
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

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleNotification = useCallback((data: NotificationType | null) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        setNotification(data);

        if (data) {
            timerRef.current = setTimeout(() => {
                setNotification(null);
                timerRef.current = null;
            }, 3000);
        }
    }, []);

    const value = useMemo(
        () => ({
            notification,
            handleNotification,
        }),
        [notification, handleNotification],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
