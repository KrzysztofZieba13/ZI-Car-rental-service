import { cn } from '../../utils/util.ts';

interface LogoProps {
    path: string;
    variant?: 'primary' | 'secondary';
    alt: string;
    className?: string;
}
const Logo = ({ path, variant = 'primary', alt, className }: LogoProps) => {
    return (
        <div
            className={cn(
                'mb-4',
                variant === 'primary' && 'w-48',
                variant === 'secondary' && 'w-32.5',
                className,
            )}
        >
            <img src={path} alt={alt} />
        </div>
    );
};

export default Logo;
