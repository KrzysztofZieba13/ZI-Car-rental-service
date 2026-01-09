import { cn } from '../../utils/util.ts';
import React from 'react';

interface ButtonProps {
    type: 'submit' | 'reset' | 'button';
    variant?: 'primary' | 'secondary' | 'transparent';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

const Button = ({
    type = 'submit',
    variant = 'primary',
    className,
    onClick,
    children,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn(
                'cursor-pointer p-2 text-white transition-all duration-300',
                variant === 'primary' && 'bg-red-800 hover:bg-red-900',
                variant === 'secondary' && 'bg-sky-800 hover:bg-sky-900',
                variant === 'transparent' && 'bg-transparent text-white',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default Button;
