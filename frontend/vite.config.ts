import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@logo': path.resolve(__dirname, './src/assets/logo'),
        },
    },
    plugins: [react(), tailwindcss()],
});
