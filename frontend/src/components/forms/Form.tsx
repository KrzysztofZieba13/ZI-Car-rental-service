import React from 'react';

interface FormProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    children: React.ReactNode;
}
const Form = ({ handleSubmit, children }: FormProps) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {children}
        </form>
    );
};

export default Form;
