import { type MouseEvent } from 'react';
import type { ServerImage } from '../../../types/formTypes.ts';
interface DropzoneImagesPreviewProps {
    images: (FileWithPreview | ServerImage)[];
    onTogglePrimary: ImageHandler;
    onRemove: ImageHandler;
}

type ImageHandler = (e: MouseEvent, filename: string) => void;

interface FileWithPreview extends File {
    preview: string;
    isPrimary: boolean;
}

const DropzoneImagesPreview = ({
    images,
    onTogglePrimary,
    onRemove,
}: DropzoneImagesPreviewProps) => {
    return (
        <div className="flex cursor-pointer gap-2">
            {images.map((file) => (
                <div
                    key={file.name}
                    onClick={(e) => onTogglePrimary(e, file.name)}
                    className={`relative h-28 w-28 border-4 transition-all ${
                        file.isPrimary
                            ? 'scale-105 border-red-800 shadow-lg'
                            : 'border-transparent'
                    }`}
                >
                    <img
                        src={file.preview}
                        className="h-full w-full object-cover"
                        alt="preview"
                    />
                    {file.isPrimary && (
                        <span className="absolute right-0 bottom-0 left-0 bg-red-800 text-center text-[10px] text-white uppercase">
                            Main
                        </span>
                    )}
                    <button
                        onClick={(e) => onRemove(e, file.name)}
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DropzoneImagesPreview;
