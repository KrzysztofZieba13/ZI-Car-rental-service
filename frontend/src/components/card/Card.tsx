import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="w-full rounded-sm shadow-md shadow-stone-400">
            {children}
        </div>
    );
};

export default Card;
