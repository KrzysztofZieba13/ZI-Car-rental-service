import { cn } from '../../utils/util.ts';

interface LogoProps {
    path: string;
    variant?: 'primary' | 'secondary';
    alt: string;
}
const Logo = ({ path, variant = 'primary', alt }: LogoProps) => {
    return (
        <div
            className={cn(
                'mb-4 flex self-center',
                variant === 'primary' && 'w-32.5',
                variant === 'secondary' && 'w-20',
            )}
        >
            <img src={path} alt={alt} />
        </div>
    );
};

export default Logo;
