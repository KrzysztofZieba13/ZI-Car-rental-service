import { Link } from 'react-router';
import React from 'react';

interface LinkUnderlineProps {
    to: string;
    children: React.ReactNode;
}
const LinkUnderline = ({ to, children }: LinkUnderlineProps) => {
    return (
        <div className="pt-2 text-stone-500">
            <Link
                className="border-b border-b-stone-500 pb-1 transition-all duration-300 hover:text-stone-800"
                to={to}
            >
                {children}
            </Link>
        </div>
    );
};

export default LinkUnderline;
