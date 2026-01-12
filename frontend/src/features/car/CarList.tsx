import type { ReactNode } from 'react';
import { useNavigation } from 'react-router';
import Loader from '../../components/Loader.tsx';

interface CarListProps {
    children: ReactNode;
}

const CarList = ({ children }: CarListProps) => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className="relative mt-8 grid grid-cols-3 gap-8">
            {children}
            {isLoading && <Loader />}
        </div>
    );
};

export default CarList;
