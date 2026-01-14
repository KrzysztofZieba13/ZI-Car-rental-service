import {unlink} from "node:fs/promises";

export const unlinkImages = async (imagesPath: string[]) => {
    for (const image of imagesPath) {
        try {
            await unlink(image);
        } catch(err: any) {
            if (err.code !== 'ENOENT') {
                console.error(`Error occur when delete image ${image}:`, err);
            }
        }
    }
}