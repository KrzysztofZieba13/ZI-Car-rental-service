import { type Accept, useDropzone } from 'react-dropzone';
import { type ReactNode } from 'react';

interface DropzoneProps {
    name: string;
    onDrop: (acceptedFiles: File[]) => void;
    acceptedFileTypes: Accept;
    children?: ReactNode;
}

const Dropzone = ({
    name,
    onDrop,
    acceptedFileTypes,
    children,
}: DropzoneProps) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes,
        onDrop: onDrop,
    });

    return (
        <div className="w-full cursor-pointer">
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-stone-300 px-5 py-12"
            >
                <input {...getInputProps({ id: name })} />
                {children}
            </div>
        </div>
    );
};

export default Dropzone;
