import type { ReactNode } from 'react';

interface CarListProps {
    children: ReactNode;
}

const CarList = ({ children }: CarListProps) => {
    return <div className="mt-8 grid grid-cols-3 gap-8">{children}</div>;
};

export default CarList;
