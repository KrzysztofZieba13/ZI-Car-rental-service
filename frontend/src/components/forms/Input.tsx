import React from 'react';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    value: string | number;
    placeholder: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = ({
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
}: InputProps) => {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                onChange={handleChange}
                value={value}
                className="my-1 w-md border p-2"
                placeholder={placeholder}
            />
        </div>
    );
};
export default Input;
