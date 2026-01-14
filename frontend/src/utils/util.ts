import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getFilenameFromImageUrl = (path: string) => path.split('/').at(1);

export const getImageUrl = (filename: string) => {
    const url: string = `${import.meta.env.VITE_SERVER_URL}${getFilenameFromImageUrl(filename)}`;
    return url;
};

export const formatDatePL = (isoDate: string | Date): string => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    return date.toLocaleDateString('pl-PL', options);
};
