import React from 'react';
import carziLogo from '@logo/car-zi.png';
import Logo from '../../components/logo/Logo.tsx';

interface AuthCardProps {
    children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="flex min-h-1/2 w-160 flex-col gap-4 bg-stone-100 px-12 pt-8 pb-16">
                <Logo
                    path={carziLogo}
                    alt="Car-zi company logo"
                    variant="secondary"
                    className="self-center"
                />
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
