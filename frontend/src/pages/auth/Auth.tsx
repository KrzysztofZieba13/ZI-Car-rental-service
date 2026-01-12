import React from 'react';
import carImageWEBP from '@images/auth-car.webp';
import carImageJPG from '@images/auth-car.jpg';
import AuthCard from './AuthCard.tsx';
import Image from '../../components/image/Image.tsx';
interface AuthProps {
    children: React.ReactNode;
}
const Auth = ({ children }: AuthProps) => {
    return (
        <div className="flex h-dvh w-full overflow-hidden bg-stone-950">
            <AuthCard>{children}</AuthCard>
            <Image
                srcWEBP={carImageWEBP}
                srcJPG={carImageJPG}
                alt="Car mercedes"
                fetchPriority="high"
            />
        </div>
    );
};

export default Auth;
