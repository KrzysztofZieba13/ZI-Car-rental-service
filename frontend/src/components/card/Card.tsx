import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return (
        <div className="w-full rounded-sm shadow-md shadow-neutral-400">
            {children}
        </div>
    );
};

export default Card;
