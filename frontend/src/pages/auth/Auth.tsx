import React from 'react';
import carImageWEBP from '@images/auth-car.webp';
import carImageJPG from '@images/auth-car.jpg';
import AuthCard from './AuthCard.tsx';
interface AuthProps {
    children: React.ReactNode;
}
const Auth = ({ children }: AuthProps) => {
    return (
        <div className="flex h-dvh w-full overflow-hidden bg-stone-950">
            <AuthCard>{children}</AuthCard>
            <div>
                <picture>
                    <source srcSet={carImageWEBP} />
                    <img
                        src={carImageJPG}
                        alt="Car mercedes"
                        fetchPriority="high"
                        className="h-full w-full object-cover"
                    />
                </picture>
            </div>
        </div>
    );
};

export default Auth;
