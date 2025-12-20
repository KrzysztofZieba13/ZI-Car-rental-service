import { cn } from '../../utils/util.ts';

interface ButtonProps {
    type: 'submit' | 'reset' | 'button';
    variant?: 'primary' | 'secondary';
    children?: React.ReactNode;
}

const Button = ({
    type = 'submit',
    variant = 'primary',
    children,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn(
                'mt-2 cursor-pointer p-2 text-white transition-all duration-300',
                variant === 'primary' && 'bg-red-800 hover:bg-red-900',
                variant === 'secondary' && 'bg-sky-800 hover:bg-sky-900',
            )}
        >
            {children}
        </button>
    );
};
export default Button;
