import type { ReactNode } from 'react';
import { useNavigation } from 'react-router';

interface CarListProps {
    children: ReactNode;
}

const CarList = ({ children }: CarListProps) => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className="relative mt-8 grid grid-cols-3 gap-8">
            {children}
            {isLoading && (
                <div className="absolute top-0 left-0 h-full w-full bg-neutral-100/70"></div>
            )}
        </div>
    );
};

export default CarList;
