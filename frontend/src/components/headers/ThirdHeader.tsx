import { type ReactNode } from 'react';

interface ThirdHeaderProps {
    children?: ReactNode;
}

const ThirdHeader = ({ children }: ThirdHeaderProps) => {
    return <h3 className="mb-2 text-xl font-medium">{children}</h3>;
};

export default ThirdHeader;
