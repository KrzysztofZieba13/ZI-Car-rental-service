import React from 'react';

interface PrimaryHeaderProps {
    children: React.ReactNode;
}
const PrimaryHeader = ({ children }: PrimaryHeaderProps) => {
    return <h1 className="mb-2 self-start text-3xl">{children}</h1>;
};

export default PrimaryHeader;
