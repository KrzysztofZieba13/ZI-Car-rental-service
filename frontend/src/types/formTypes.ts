export interface SelectFieldOption {
    value: string;
    label: string;
}

export interface FileWithPreview extends File {
    preview: string;
    isPrimary: boolean;
    isFromServer: false;
}

export interface ServerImage {
    name: string;
    isPrimary: boolean;
    preview: string;
    isFromServer: true;
}
