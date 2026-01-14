import React from 'react';
import PrimaryHeader from '../headers/PrimaryHeader.tsx';

interface ModalProps {
    header: string;
    children: React.ReactNode;
}

const Modal = ({ header, children }: ModalProps) => {
    return (
        <div className="fixed top-0 left-0 z-10 h-full w-full bg-stone-700/40 backdrop-blur-[3px]">
            <div className="fixed top-1/2 left-1/2 flex min-w-140 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-white px-8 pt-8 pb-4">
                <PrimaryHeader>{header}</PrimaryHeader>
                {children}
            </div>
        </div>
    );
};

export default Modal;
