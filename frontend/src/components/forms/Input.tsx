import React from 'react';
import { cn } from '../../utils/util.ts';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    value: string | number;
    placeholder: string;
    className?: string;
    error: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = ({
    type,
    name,
    label,
    value,
    placeholder,
    className,
    error,
    handleChange,
}: InputProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                onChange={handleChange}
                value={value}
                className={cn(
                    'w-full rounded-sm border border-neutral-300 p-1.5 focus:border-yellow-700 focus:outline-sky-700',
                    className,
                )}
                placeholder={placeholder}
            />
            <span className="text-sm text-red-800">{error}</span>
        </div>
    );
};
export default Input;
