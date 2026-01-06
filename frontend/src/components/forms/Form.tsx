import React from 'react';
import { cn } from '../../utils/util.ts';

interface FormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    className?: string;
    children: React.ReactNode;
}
const Form = ({ handleSubmit, className, children }: FormProps) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={cn('flex flex-col gap-3', className)}
        >
            {children}
        </form>
    );
};

export default Form;
