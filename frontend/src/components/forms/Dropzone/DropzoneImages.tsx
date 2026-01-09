import { useEffect, type MouseEvent } from 'react';
import Dropzone from './Dropzone.tsx';
import DropzoneImagesPreview from './DropzoneImagesPreview.tsx';

interface DropzoneProps {
    name: string;
    label?: string;
    onFilesChange: (files: FileWithPreview[]) => void;
    value: FileWithPreview[];
    onClearDropzone: () => void;
    error: string;
}

interface FileWithPreview extends File {
    preview: string;
    isPrimary: boolean;
}

const DropzoneImages = ({
    name,
    label,
    onFilesChange,
    onClearDropzone,
    value,
    error,
}: DropzoneProps) => {
    const acceptedFileTypes = {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    };

    const handleDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file, index: number) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                isPrimary: value.length === 0 && !index,
            }),
        );
        onFilesChange([...value, ...newFiles]);
    };

    const togglePrimary = (e: MouseEvent, fileName: string) => {
        e.stopPropagation();
        const updatedFiles = value.map((file) =>
            Object.assign(file, { isPrimary: file.name === fileName }),
        );
        onFilesChange(updatedFiles);
    };

    const removeFile = (e: MouseEvent, fileName: string) => {
        e.stopPropagation();
        const filteredFiles = value.filter((file) => file.name !== fileName);

        if (
            filteredFiles.length > 0 &&
            !filteredFiles.some((f) => f.isPrimary)
        ) {
            filteredFiles[0].isPrimary = true;
        }

        onFilesChange(filteredFiles);
    };

    useEffect(() => {
        return () => onClearDropzone();
    }, []);

    return (
        <div className="flex w-full flex-col gap-1">
            {label && <label htmlFor={name}>{label}</label>}
            <Dropzone
                name="images"
                onDrop={handleDrop}
                acceptedFileTypes={acceptedFileTypes}
            >
                {value.length === 0 ? (
                    <p className="text-center text-neutral-500">
                        Drag 'n' drop some pictures of your car, or click to
                        select pictures
                    </p>
                ) : (
                    <DropzoneImagesPreview
                        images={value}
                        onTogglePrimary={togglePrimary}
                        onRemove={removeFile}
                    />
                )}
            </Dropzone>
            <span className="text-sm text-red-800">{error}</span>
        </div>
    );
};

export default DropzoneImages;
